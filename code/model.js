const mobilenet = await tf.loadModel(
  "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json",
);

// Return a model that outputs an internal activation.
const layer = mobilenet.getLayer("conv_pw_13_relu");
this.mobilenet = tf.model({
  inputs: mobilenet.inputs,
  outputs: layer.output,
});

// Hyperparams
const batchSizeRatio = 0.4;
const epochs = 20;
const hiddenUnits = 100;
const learningRate = 0.0001;

export function model(numClasses) {
  // Creates a 2-layer fully connected model. By creating a separate model,
  // rather than adding layers to the mobilenet model, we "freeze" the weights
  // of the mobilenet model, and only train weights from the new model.
  let model = tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      tf.layers.flatten({ inputShape: [7, 7, 256] }),
      // Layer 1
      tf.layers.dense({
        units: hiddenUnits,
        activation: "relu",
        kernelInitializer: "varianceScaling",
        useBias: true,
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: numClasses,
        kernelInitializer: "varianceScaling",
        useBias: false,
        activation: "softmax",
      }),
    ],
  });

  // Creates the optimizers which drives training of the model.
  const optimizer = tf.train.adam(learningRate);
  // We use categoricalCrossentropy which is the loss function we use for
  // categorical classification which measures the error between our predicted
  // probability distribution over classes (probability that an input is of each
  // class), versus the label (100% probability in the true class)>
  model.compile({ optimizer: optimizer, loss: "categoricalCrossentropy" });

  return model;
}
