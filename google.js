// Declares a new class, Google.
class Google {

    // Declares a constructor function, which takes an object containing authentication details.
    constructor(authDetails) {
        // Assigns the authDetails object to the new instance of Google.
        this.authDetails = authDetails
    }

    // Declares a function to load the current client.
    load = () => {
        // Returns a promise.
        return new Promise((resolve, reject) => {
            // Loads the client.
            gapi.load('client:auth2', () => {
                // Intiates the client with authentication details.
                gapi.client.init(this.authDetails).then(() => {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
                    // Handle the initial sign-in state.
                    this.updateSignInStatus();
                    // Resolves the promise.
                    resolve();
                }).catch(err => {
                    // Rejects the promise.
                    reject(err);
                });
            });
        });
    }

    // Declares a function to sign the user in.
    signIn = () => {
        return new Promise((resolve, reject) => {
            this.updateSignInStatus();
            if (!this.signedIn) {
                gapi.auth2.getAuthInstance().signIn().then(resolve).catch(err => reject(err.data));
            } else {
                resolve();
            }
        });
    }
    
    // Declares a function to update the signedIn property of the current istance of Google.
    updateSignInStatus = () => {
        console.log(this);
        // Updates the signedIn property to the signedIn status of the current auth instance.
        this.signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    // Declares a function to get a list of files in the user's Google Drive account.
    listFiles = (pageSize) => {
        // Returns a promise
        return new Promise((resolve, reject) => {
            // Lists the files.
            gapi.client.drive.files.list({
                pageSize: (pageSize ? pageSize : 100),
                fields: "nextPageToken, files(id, name)"
            }).then((response) => {
                // Resolves the promise.
                resolve(response.result.files);
            }).catch(err => reject(err.data));
        });
    }

    // Declares a function to get the contents of a file.
    getFileById = (id) => {
        return new Promise((resolve, reject) => {
            Promise.all([
                gapi.client.drive.files.get({
                  fileId: id,
                  alt: 'media'
                }),
                gapi.client.drive.files.get({
                  fileId: id
                })
            ]).then(data => {
                resolve({
                    content: data[0].result,
                    metadata: data[1].result
                });
            }).catch(err => reject(err.data));
        });
    }

    // Declares a functin to log the user out.
    signOut = () => {
        // Logs the user out.
        gapi.auth2.getAuthInstance().signOut();
    }
}

const sampleAuthDetails = {
    apiKey: 'AIzaSyA5XKXwr4d01HQxDNZoudEeCeTdAScaCtE',
    clientId: '348618849964-m8pvqgv00maq7rljcut05e3i0j0ek95p.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.appdata'
}