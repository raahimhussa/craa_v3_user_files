class MobxUtil {
  static _get = (state: any, path: any) => {
    if (!state || !path) {
      return null;
    }
    let value = null;
    return eval(`value = state.${path}`);
  };
  static _set = (state: any, path: any, value: any) => {
    if (!state || !path) {
      return null;
    }
    return eval(`state.${path} = value`);
  };
}

export default MobxUtil;
