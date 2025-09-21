/* eslint-disable no-console */
import { GoogleStrategy } from "passport-bitbucket-oauth20";
// import passport, { type Profile } from "passport";
// import { GoogleStrategy } from "passport-bitbucket-oauth20";
// import { envVars } from "./env";

import passport, { type Profile } from "passport";
import type { VerifyCallback } from "passport-oauth2";
import { Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "./env";

// passport.use(new GoogleStrategy(
//     {
//         clientId: envVars.GOOGLE_CLIENT_ID,
//         clientSecret: envVars.GOOGLE_CLIENT_SECRET,
//         callBackURL: envVars.GOOGLE_CALLBACK_URL,
//     }, async(accessToken: string, refreshToken: string, profile: Profile) => {}
// ));

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false, { message: "No email found." });
        }
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
