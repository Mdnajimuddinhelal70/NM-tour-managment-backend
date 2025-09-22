/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// import { Strategy as BitbucketStrategy } from "passport-bitbucket-oauth20";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-console */
// // import { GoogleStrategy } from "passport-bitbucket-oauth20";

// import passport, { type Profile } from "passport";
// import type { VerifyCallback } from "passport-oauth2";
// import { Role } from "../modules/user/user.interface";
// import { User } from "../modules/user/user.model";
// import { envVars } from "./env";

// passport.use(
//   new BitbucketStrategy(
//     {
//       clientID: envVars.GOOGLE_CLIENT_ID,
//       clientSecret: envVars.GOOGLE_CLIENT_SECRET,
//       callbackURL: envVars.GOOGLE_CALLBACK_URL,
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback
//     ) => {
//       try {
//         const email = profile.emails?.[0]?.value;
//         if (!email) {
//           return done(null, false, { message: "No email found." });
//         }
//         let user = await User.findOne({ email });
//         if (!user) {
//           user = await User.create({
//             email,
//             name: profile.displayName,
//             picture: profile.photos?.[0]?.value,
//             role: Role.USER,
//             isVerified: true,
//             auths: [
//               {
//                 provider: "google",
//                 providerId: profile.id,
//               },
//             ],
//           });
//         }
//         return done(null, user);
//       } catch (error) {
//         console.log("Google Strategy Error", error);
//         return done(error);
//       }
//     }
//   )
// );

// // Serialize
// passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id: string, done: any) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     console.log(error);
//     done(error);
//   }
// });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(null, false, { message: "No email found." });

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      } catch (error) {
        console.log("Google Strategy Error", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
