<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<input type="password" displayable v-model="psw" placeholder="请输入密码"></input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		Login
	} from '../../common/getData.js'
	export default {
		data() {
			return {
				account: '',
				psw: '',
				obj: {
					a: {
						b: {
							c: {
								d: 1
							}
						}
					}
				}
			};
		},
		computed: {
			...mapState('storage', ['password'])
		},
		methods: {
			...mapMutations('storage', ['updateLoginID', 'updatePassword']),
			bindLogin() {
				this.updateLoginID(this.account)
				this.updatePassword(this.obj)
				setTimeout(() => {
					this.password.a.b.c.d = [1,2]
					console.log('ok')
					setTimeout(() => {
						this.password.a.b.c.d.push(3,4,5)
						console.log('2次ok')
						setTimeout(() => {
							this.password.a.b.c.d.reverse()
							console.log('3次ok')
							for(let i=1;i<4;i++){
								setTimeout(()=>{
									this.password.a.b.c.d.pop()
								},i*200)
							}
						}, 3000)
					}, 3000)
				}, 3000)
				Login({
					account: this.account,
					password: this.psw
				})
			}

		}
	}
</script>

<style>
</style>
