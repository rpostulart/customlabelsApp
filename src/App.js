import logo from "./logo.svg";
import hb from "./hamb.jpeg";
import "./App.css";
import { useEffect, useState } from "react";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import FileBase64 from "react-file-base64";
import Amplify from "aws-amplify";
import {
  Predictions,
  AmazonAIPredictionsProvider,
} from "@aws-amplify/predictions";
import awsconfig from "./aws-exports";

//Amplify.configure(awsconfig);

Amplify.configure({
  // To get the AWS Credentials, you need to configure
  // the Auth module with your Cognito Federated Identity Pool
  ...awsconfig,
  predictions: {
    identify: {
      identifyCustomLabels: {
        proxy: true,
        region: "eu-west-1",
        defaults: {
          format: "LABELS",
        },
      },

      identifyLabels: {
        proxy: true,
        region: "eu-west-1",
        defaults: {
          type: "LABELS",
        },
      },
    },
  },
});

Predictions.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  const getFiles = async (files) => {
    console.log(files[0]);

    Predictions.identify({
      customlabels: {
        source: {
          //key:
          // "s3://pandora8f84c25ca4ad431ea2b45b1f0406261e201111-dev/198863C01_V4_RGB.jpeg",

          file: files[0].file,
        },
        projectVersionArn:
          "arn:aws:rekognition:eu-west-1:415588941872:project/hamburger/version/hamburger.2020-12-01T17.58.07/1606841887495",
        type: "LABELS",
      },
    })
      .then(console.log)
      .catch(console.error);
  };
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <FileBase64 multiple={true} onDone={getFiles.bind(this)} />
        </header>
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
