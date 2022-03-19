import './App.scss';

import { getFirebaseData, performCoolerOperations } from './apis';
import { useEffect, useState } from 'react';

import { Logs } from './Logs';
import { Switch } from './Switch';

const FAN_SPEED_SEQUENCE = ['off', 'high', 'mid', 'low'];

const initialState = {
  fan: false,
  fanSpeed: 'off',
  swing: false,
  cool: false,
  onoff: false,
  mosquitto: false,
  synced: false,
  logs: []
};

function App() {
  const [data, setData] = useState(initialState);
  const [enableUI, setEnableUI] = useState(false);
  const [enablePowerBtn, setEnablePowerBtn] = useState(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      let resp = await getFirebaseData();
      resp.fan = resp.fanSpeed === 'off' ? false : true;
      resp.logs = Object.values(resp.logs).reverse()
      setData(resp);
      setEnableUI(resp.onoff ? resp.synced : false);
      setEnablePowerBtn(resp.synced);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const setFanValue = () => {
    let val = 'off';
    const fanSpeed = data.fanSpeed;
    const fanSpeedIndex = FAN_SPEED_SEQUENCE.indexOf(fanSpeed);
    val = FAN_SPEED_SEQUENCE[fanSpeedIndex === 3 ? 0 : fanSpeedIndex + 1];
    return val;
  }

  const handleOnOff = (e, name = '') => {
    let payload = {};

    if (name === 'Fan') {
      const fanVal = setFanValue();
      setData({
        ...data,
        fan: fanVal === 'off' ? false : true,
        fanSpeed: fanVal
      });

      payload = {
        controlName: 'fanSpeed',
        value: fanVal
      };

    } else if (name === 'Power') {
      const val = e.target.checked;
      setData(val ? {
        ...data,
        onoff: e.target.checked
      } : initialState);

      payload = {
        controlName: 'onoff',
        value: e.target.checked
      };

    } else {
      setData({
        ...data,
        [name.toLocaleLowerCase()]: e.target.checked
      });

      payload = {
        controlName: name.toLocaleLowerCase(),
        value: e.target.checked
      };
    }
    setEnableUI(false);
    setEnablePowerBtn(false);
    performCoolerOperations(payload);
  }

  return (
    <div className="container">
      <div className='controls'>
        <Switch
          enabled={enablePowerBtn}
          isOn={data.onoff}
          handleOnOff={(e) => handleOnOff(e, 'Power')}
          name='Power'
        />

        <Switch
          enabled={enableUI}
          isOn={data.fan}
          fanSpeed={data.fanSpeed}
          handleOnOff={(e) => handleOnOff(e, 'Fan')}
          name='Fan'
        />

        <Switch
          enabled={enableUI && data.fan}
          isOn={data.cool}
          handleOnOff={(e) => handleOnOff(e, 'Cool')}
          name='Cool'
        />

        <Switch
          enabled={enableUI && data.fan}
          isOn={data.swing}
          handleOnOff={(e) => handleOnOff(e, 'Swing')}
          name='Swing'
        />

        <Switch
          enabled={enableUI && data.fan}
          isOn={data.mosquitto}
          handleOnOff={(e) => handleOnOff(e, 'Mosquitto')}
          name='Mosquitto'
        />

      </div>
      <Logs logs={data.logs} />
    </div>
  );
}

export default App;
