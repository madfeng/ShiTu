/**
 * @flow
 * Created by Rabbit on 2018/4/26.
 */

import React from 'react';

import FastImage from 'react-native-fast-image';
import { Image, StyleSheet, ActivityIndicator, View} from 'react-native';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

type Props = {
  useCustomImage: boolean;
  ...any;
}

let CustomImage;

@observer
export default class index extends React.Component<Props, any> {

  static defaultProps = {
  	useCustomImage: true,
  };

  @observable imageLoadedError: boolean = false;

  constructor(props: Props) {
  	super(props);

  	if (props.useCustomImage) {
  		CustomImage = FastImage;
  	} else {
  		CustomImage = FastImage;
  	}
  }

  imageLoadError() {
  	console.log('onError');
  	this.imageLoadedError = true;

  	this.props.onError && this.props.onError();
  }

  render() {
  	const { source, style } = this.props;
  	return (
  		<View style={[styles.customImageView]}>
  			<CustomImage
  				style={style}
  				source = {
  					!this.imageLoadedError
  						?
  						source
  						:
  						{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/Error_Img.png' }
  				}
  				{...this.props}

  				onError={this.imageLoadError.bind(this)}
  			/>
  		</View>

  	);
  }
}

const styles = StyleSheet.create({
	customImageView: {
		flex: 1,
		justifyContent: 'center',
	},
	activityStyle: {
		position: 'absolute',
	}
});
