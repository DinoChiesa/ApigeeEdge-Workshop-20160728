// userDb.js
// ------------------------------------------------------------------
//
// This is a mock user validation database. The hash stores usernames and
// the hex-encoded sha256 of the passwords, as well as roles for the users.
//
// To generate additional sha256 passwords on macosx:
//
//   echo -n "password-value" | shasum -a 256
//
// This is a little bit elaborate for a fake user authentication system.
// I just wanted to show some of the things that could be done in a JS callout.
//
// -Dino
//
// created: Fri Mar 25 20:01:12 2016
// last saved: <2016-July-29 21:48:37>

var userDb = {
      carrie : { // carson
        hash: 'b9f9ab6a93532d055272dadadef56288b514ff25bf639b12507e062a9c37b0af',
        roles: ['read', 'edit', 'delete']
      },
      brandon : { // jones
        hash: '9706987d633e05a0d2931c21108b37e8c790570048ac47c48900314bb325d606',
        roles: ['read']
      },
      justin: { // madalone
        hash : 'd209a2e0db7bcafea8c091c7f05ee2240c84e65d76a93921d715360d83a62412',
        roles: ['read']
      },
      matthew: { // palmgren
        hash : 'd8c3e0826881ca90b4d4f0cad25206ea10a1afd41c1d9e14127a2c80d6b98281',
        roles: ['read']
      },
      matt: { // mcsweyn
        hash : '423afd952352b79a46e3d8bfbab2107d41f2f454d8cc7954bd6f92dfa95ff268',
        roles: ['read']
      },
      david: { // knoernschild
        hash : '970f96f2b50d4457fdf86b44ed63bcc60282380a3e3dd3a8949da5737c1d7f92',
        roles: ['read']
      },
      edward: { // cerruti
        hash : 'cb04f684e706bf6a5242cf7362d1a5a55ba16c47c59492bc192c0ca870f2c60b',
        roles: ['read']
      },
      dino: { // chiesa
        hash : '3052eb6f7bae7493e012033c995b4942026098ddc1c2748e3a17503ed5470097',
        roles: ['read', 'write']
      }

      // Obviously, you can add more records here.
      // Also, you can add other properties to each record. For example, beyond
      // roles, you could add 'defaultProvider' or whatever else makes sense
      // in your desired system. If you DO add other data items, then
      // you would also need to modify the proxy to attach those properties to
      // a token issued by Edge.
      //
      // Follow the example in the GenerateAccessToken policy for the roles.

    };
