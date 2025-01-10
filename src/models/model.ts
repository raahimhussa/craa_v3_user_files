class Model<D, S> {
  store: S;
  constructor(store: S, data: D) {
    this.store = store;
    Object.assign(this, data);
  }
}

export default Model;
