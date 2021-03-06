/**
 * @flow
 * Created by Rabbit on 2018/5/4.
 */

import {observable, computed, action, runInAction, autorun} from 'mobx';
import type {RTGankResult, RTWeal} from '../../servers/News/types';
import {loadWelfareData} from '../../servers/News';
import {System} from '../../utils';

let loadMoreNumber = [];

class WelfareMobx {

  @observable isRefreshing: boolean = true;
  @observable dataSource: Array<RTGankResult> = [];
  @observable page: number = 1;

  @action.bound
  async fetchWelfareData(page) {
  	try {
  		const data = await loadWelfareData(page);

  		const results = data.results;

  		results.map((item: RTWeal) => {
  			const imageWidth = System.SCREEN_WIDTH / 2 - 15;
  			let imageHeight = imageWidth * 1.15;
  			imageHeight = parseInt(Math.random() * 100 + imageHeight);
  			item.height = imageHeight;
  			item.width = imageWidth;
  		});

  		if (page !== 1) {
  			console.log('page不等于1', page);

  			this.page = page;
  			this.dataSource = this.dataSource.concat(results);

  		} else {
  			this.page = 1;
  			this.dataSource = results;

  			console.log('page等于1', page);
  		}

  		this.isRefreshing = false;

  	} catch (e) {
  		this.isRefreshing = false;
  		console.log(e);
  	}
  }

  @action.bound
  async refreshData() {
  	this.isRefreshing = true;
  	await this.fetchWelfareData(1);
  }

  @action.bound
  async loadMoreData(distanceFromEnd: Array<number>) {
  	if (loadMoreNumber.length === 2) loadMoreNumber = [];

  	loadMoreNumber.push(distanceFromEnd);

  	let page = this.page;

  	if (loadMoreNumber.length === 2) {
  		page += 1;
  		await this.fetchWelfareData(page);
  	}
  }
}

export { WelfareMobx };