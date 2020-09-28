package com.ejarly;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import cl.json.RNSharePackage;
import com.rumax.reactnative.pdfviewer.PDFViewPackage;
import org.wonday.pdf.RCTPdfView;
import com.reactnativecommunity.progressview.RNCProgressViewPackage;
import com.reactnativecommunity.androidprogressbar.RNCProgressBarPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
// import com.keyee.pdfview.PDFView;
import com.goodatlas.audiorecord.RNAudioRecordPackage;
import io.github.elyx0.reactnativedocumentpicker.DocumentPickerPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.wheelpicker.WheelPickerPackage;
import com.zyu.ReactNativeWheelPickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.opensettings.OpenSettingsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.marianhello.bgloc.react.BackgroundGeolocationPackage;
import com.facebook.drawee.backends.pipeline.Fresco;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
// import android.support.multidex.MultiDex;
import android.content.Context;
import com.wix.interactable.Interactable;
import java.util.Arrays;
import java.util.List;

import com.reactnativecommunity.slider.ReactSliderPackage;

import androidx.multidex.MultiDex;

public class MainApplication extends NavigationApplication {

    // private static CallbackManager mCallbackManager =
    // CallbackManager.Factory.create();

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {

            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    // protected static CallbackManager getCallbackManager() {
    // return mCallbackManager;
    // }

    @Override
    public void onCreate() {
        super.onCreate();
        // FacebookSdk.sdkInitialize(getApplicationContext());
        // AppEventsLogger.activateApp(this);
        // Fresco.initialize(this);

    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new ImageResizerPackage(),
            new CameraRollPackage(), new RNFusedLocationPackage(),
                new RNCViewPagerPackage(), new RNSharePackage(), new PDFViewPackage(), new RCTPdfView(),
                new RNCProgressViewPackage(), new RNCProgressBarPackage(), new RNFetchBlobPackage(),
                new DocumentPickerPackage(), new ImagePickerPackage(), new RNAudioRecordPackage(), new NetInfoPackage(),
                new AsyncStoragePackage(),

                new WheelPickerPackage(), new ReactNativeWheelPickerPackage(), new VectorIconsPackage(),
                new SvgPackage(), new SplashScreenReactPackage(), new RNSpinkitPackage(), new RNSoundPackage(),
                new SnackbarPackage(), new RNShimmerPackage(), new ReanimatedPackage(), new OpenSettingsPackage(),
                new MapsPackage(), new LinearGradientPackage(), new RNI18nPackage(), new RNGoogleSigninPackage(),
                new RNGestureHandlerPackage(), new RNFirebasePackage(), new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage(), new FastImageViewPackage(), new ExtraDimensionsPackage(),
                // new FBSDKPackage(mCallbackManager),
                new ReactSliderPackage(), new BackgroundGeolocationPackage(), new Interactable());
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
