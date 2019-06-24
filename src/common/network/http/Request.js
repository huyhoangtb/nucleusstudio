
const PROGRESS_PROCESS = 0.8;

class Request {

  /**
   * fetch data
   *
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  async get(url, params) {
    if (window.NProgress) {
      window.NProgress.start();
      window.NProgress.set(PROGRESS_PROCESS);
    }

    const result = await fetch(url);
    if (window.NProgress) {
      window.NProgress.done();
    }

    return result.json();

  }

}

export default new Request();
