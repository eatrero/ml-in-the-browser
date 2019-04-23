/**
 * Sets up and trains the classifier.
 */
export async function train(model, controllerDataset, trainCallback) {
  if (controllerDataset.xs == null) {
    throw new Error("Add some examples before training!");
  }

  const batchSize = Math.floor(controllerDataset.xs.shape[0] * batchSizeRatio);

  // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
  model.fit(controllerDataset.xs, controllerDataset.ys, {
    batchSize,
    epochs,
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        trainCallback(logs);
        await tf.nextFrame();
      },
    },
  });
}
