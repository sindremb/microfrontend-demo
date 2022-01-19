import React, { Component } from 'react';

type MicrofrontendMountFunction = (elementId: string, basePath: string) => void;
type MicrofrontendUnmountFunction = (elementId: string) => void;

export type MicrofrontendDefinition = {
  name: string;
  host: string;
  basePath: string;
}

const makeContainerId = (name: string) => `${name}-container`;
const makeScriptId = (name: string) => `${name}-script`;

const mountMicrofrontend = (
  name: string,
  basePath: string,
) => {
  const mountFunction = (window as any)[`mount${name}`];
  if (mountFunction) {
    (mountFunction as MicrofrontendMountFunction)(makeContainerId(name), basePath);
  };
};

const unmountMicrofrontend = (name: string) => {
  const unmountFunction = (window as any)[`unmount${name}`];
  if (unmountFunction) {
    (unmountFunction as MicrofrontendUnmountFunction)(makeContainerId(name));
  };
};

const loadMicrofrontendScript = async (name: string, host: string) => {
  const scriptId = makeScriptId(name);
  if (document.getElementById(scriptId)) {
    return;
  }

  return await new Promise((resolve, reject) => {
    return fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = () => resolve(null);
        document.head.appendChild(script);
      })
      .catch(reject);
  });
};

type MicrofrontendProps = MicrofrontendDefinition;

type MicrofrontendState = {
  isLoading: boolean;
  error?: string | null;
}

export class Microfrontend extends Component<MicrofrontendProps, MicrofrontendState> {

  private mountedAppName: string | null = null;

  state: MicrofrontendState = {
    isLoading: false,
  };

  loadCurrentMicrofrontend() {
    const { name, host, basePath } = this.props;
    if (this.mountedAppName === name) {
      return;
    }
    this.mountedAppName = name;
    this.setState({ isLoading: true, error: null });
    loadMicrofrontendScript(name, host)
      .then(() => {
        mountMicrofrontend(name, basePath);
        this.setState({ isLoading: false, error: null });
      })
      .catch((e: any) => {
        this.setState({ isLoading: false, error: e?.message || 'Unable to load microfrontend' });
      });
  }

  componentWillUnmount() {
    if (this.mountedAppName) {
      unmountMicrofrontend(this.mountedAppName);
    }
  }

  componentDidUpdate() {
    this.loadCurrentMicrofrontend();
  }

  componentDidMount() {
    this.loadCurrentMicrofrontend();
  }

  render() {
    const { name } = this.props;
    const { isLoading, error } = this.state;
    const containerId = makeContainerId(name);

    if (this.mountedAppName && this.mountedAppName !== name) {
      unmountMicrofrontend(this.mountedAppName);
    }

    return (
      <>
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {containerId && <div id={containerId}></div>}
      </>
    )
  }
}
