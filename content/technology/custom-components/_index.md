---
title: Third party components
description: Information on how custom/third party components are set up
tags: ["tech", "ui-designer"]
---

It should be possible to create and use custom/third party components as a part of a service in Altinn Studio. 

{{% notice info %}}
NOTE: It is not currently supported to change properties on custom components via the Altinn Studio UI editor (f.ex. texts). Therefore, any properties must be hard coded into the component at this time.
{{% /notice %}}

### How to create a custom component
All the form components in Altinn Studio and Altinn Studio Apps are created using React, and this is also a requirement for any custom components. 

To include a custom component in Altinn Studio, the finished component needs to be built into a single `index.js` file. We recommend using [rollup.js](https://rollupjs.org/guide/en) to do this. 

The easiest way to get started is to clone the example code for custom components, located [here](https://altinn.studio/Jesper/ThirdPartyComponents). The example below will be based on this code.

#### Create a React component
Create a custom React component in the `src/components` folder. Here we use the example component _BalloonCounter_, located in `src/components/BalloonComponent/index.js`:

```
import React from 'react';

export class BalloonCounter extends React.Component {
    constructor(_props, _state) {
        super(_props, _state);

        this.state = {
            count: 0,
        }
    }

    handleIncrement = () => {
        let {count} = this.state;
        count += 1;
        this.setState({
            count,
        }, () => {
            this.handleSubmitData();
        });
    }

    handleDecrement = () => {
        if(this.state.count !== 0) {
            let {count} = this.state;
            count -= 1;
            this.setState({
                count,
            }, () => {
                this.handleSubmitData();
            })
        }
    }

    handleSubmitData = () => {
        this.props.onHandleDataUpdate(this.state.count);
    }
    

    render() {
        return (
            <div>
                Number of ballons you want {this.state.count}
                <button onClick={this.handleIncrement}> + </button>
                <button onClick={this.handleDecrement}> - </button>
            </div>
        );
    }
}
```
In this example, we create a React component called _BalloonCounter_. It has defined 4 methods and a constructor:

- `constructor(_props, _state)`: Standard lifecycle method for a react component, see [here](https://reactjs.org/docs/react-component.html#constructor) for more information.
- `handleIncrement()`: Increments the _count_ value by adding 1.
- `handleDecrement()`: Decrements the _count_ value by subtracting 1.
- `handleSubmitData()`: Submits the data to the _parent component_ by calling the provided method `this.props.onHandleDataUpdate(this.state.count)` (**must** be called in order for the components data to be used) in a form.
- `render()`: Standard lifecycle method for a react component, defines what should be rendered. See [here](https://reactjs.org/docs/react-component.html#render) for more information.

{{% notice warning %}}
The method `this.props.onHandleDataUpdate(...)` is the method that the Altinn Studio application sends in to the component to handle data changes, and saving data to the form data. This method is therefore important to call in the custom component when data has been updated!
{{% /notice %}}

Once the component has been created, specify where it can be found by updating `src/components/index.js` with the following line:

```
export * from './BalloonCounter' // Replace BalloonCounter with the name of your component
```

You can add multiple components in this way, and they will then be build into the same package.

#### Build a package containing the component
From the root directory of the repository, run the following command:

```
npm run build
```

This will create a folder named `dist`, and place a file called `index.js` into this folder. This file needs to be available online, accessible by URL, to be used by Altinn Studio. The easiest way to do this is to add the file to your service repository in Gitea. You can then find the URL to the file by navigating to your service in the _Repositories_ part of the soluton (`https://altinn.studio/<organization or user name>/<service>`) and opening the file from there. Choose to view the file _raw_ to get only the file contents, and use the URL shown in the browser.

#### Adding custom component to service in Altinn Studio
In the service where the custom component is to be used, create a file called `ThirdPartyComponent.json`. It is important that the file is called exactly this, and that it is placed in the `Resources` folder in the service repository. 

Copy the following content into the file and replace the placeholders with your own values:

```
{
  "packages": [
    {
      "packageName": "[name of package]",
      "location": "[link to raw format of index.js in git-repoet]"
    }
  ]
}
```

Once this is done, sync your version of the service with the updated _Repositories_ version in Altinn Studio, and load the UI editor. The custom component(s) should appear in the list of available form components. 