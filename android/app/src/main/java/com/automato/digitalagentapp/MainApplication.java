package com.automato.digitalagentapp;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.wonday.pdf.RCTPdfView;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.imagepicker.ImagePickerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// optional packages - add/remove as appropriate
//import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
//import io.invertase.firebase.auth.RNFirebaseAuthPackage;
//import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
//import io.invertase.firebase.database.RNFirebaseDatabasePackage;
//import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
//import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
//import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
//import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
//import io.invertase.firebase.invites.RNFirebaseInvitesPackage;
//import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
//import io.invertase.firebase.perf.RNFirebasePerformancePackage;
//import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @SuppressLint("MissingPermission")
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
        new MainReactPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new ReactNativePushNotificationPackage(),
            new RCTPdfView(),
            new ReactNativeLocalizationPackage(),
            new ImagePickerPackage(),
            new RNFirebasePackage(),
            // add/remove these packages as appropriate
            //new RNFirebaseAdMobPackage(),
            new RNFirebaseAnalyticsPackage(),
            //new RNFirebaseAuthPackage(),
            //new RNFirebaseRemoteConfigPackage(),
            //new RNFirebaseCrashlyticsPackage(),
            //new RNFirebaseFirestorePackage(),
            //new RNFirebaseFunctionsPackage(),
            //new RNFirebaseInstanceIdPackage(),
            //new RNFirebaseInvitesPackage(),
            //new RNFirebaseLinksPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
//            new RNFirebasePerformancePackage(),
//            new RNFirebaseStoragePackage(),
//            new RNFirebaseDatabasePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
