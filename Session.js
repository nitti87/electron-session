const { session } = require('electron').remote

class Session {
  constructor(url = 'http://localhost') {
    this.url = url;
  }

	set({ name, value, funct }) {
    const set_session_option = { url: this.url, name: name, value: value }

    session.defaultSession.cookies.set(set_session_option).then(() => {
      // Success, return the 'funct' if it's a function
      typeof funct === 'function' ? funct() : undefined
    }, (error) => {
      // Throw the error
      console.error(error)
    })
  }

  get(name, funct) {
    const [ get_session_option ] = [name ? { url: this.url, name: name } : {}]

    session.defaultSession.cookies.get(get_session_option).then(cookie => {
      let cookieValue = name ? cookie[0].value : cookie

      typeof funct === 'function' ? funct(cookieValue) : undefined
    });
  }
}
