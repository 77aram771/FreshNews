import React from 'react';
import {Linking, View} from 'react-native';
import {IconSocial} from './IconSocial';

const linkToFacebook = () => {
  Linking.openURL('https://www.facebook.com/').catch(() => alert('Ошибка!'));
};
const linkToVk = () => {
  Linking.openURL('https://vk.com/').catch(() => alert('Ошибка!'));
};

const linkToTwitter = () => {
  Linking.openURL('https://twitter.com/').catch(() => alert('Ошибка!'));
};

const linkToInstagram = () => {
  Linking.openURL('https://www.instagram.com/').catch(() => alert('Ошибка!'));
};
export const IconsPanel = () => {
  return (
    <View style={{flexDirection: 'row', paddingTop: 30}}>
      <IconSocial name={'facebook-f'} callBack={linkToFacebook} />
      <IconSocial style={{paddingLeft: 30}} name={'vk'} callBack={linkToVk} />
      <IconSocial
        style={{paddingLeft: 30}}
        name={'twitter'}
        callBack={linkToTwitter}
      />
      <IconSocial
        style={{paddingLeft: 30}}
        name={'instagram'}
        callBack={linkToInstagram}
      />
    </View>
  );
};
