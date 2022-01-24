package com.prolanguomobile;
import com.reactnativenavigation.NavigationActivity;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;


//should extend ReactActivity?
public class MainActivity extends NavigationActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        // configure to show when appropriate
        // add this after adding drawable source
        //, R.style.SplashScreenTheme
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
    }
}
