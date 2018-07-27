<template>
   <Page>
      <ActionBar :title="$route.path" class="action-bar">
            <android>
                <NavigationButton ios.systemIcon="4" android.systemIcon="ic_menu_btn_add" ios.position="left" @tap="toggleDrawer" />
            </android>
            <ios>
                <ActionItem icon="res://ic_menu" ios.position="left" tap="RevealTransition" />
            </ios>
      </ActionBar>
        <GridLayout rows="*">
			<RadSideDrawer ref="drawer" drawerLocation="Top"  drawerTransition="PushTransition">
				<StackLayout ~drawerContent backgroundColor="white">
					<StackLayout height="56" style="text-align: center; vertical-align: center;">
						<Label text="Navigation Menu" />
					</StackLayout>
					<StackLayout>
						<Label text="Current Weather" padding="20"  @tap="$router.push('/master')" />
						<Label text="Search by city name" padding="20" backgroundColor="#42b983" @tap="$router.push('/city')"  />
					</StackLayout>
					<Label text="Close" color="#42b983" padding="20" style="horizontal-align: center" @tap="onCloseDrawerTap" />
				</StackLayout>
				<StackLayout ~mainContent class="home-panel">
                        <ScrollView>
                            <StackLayout class="home-panel">
                                <TextField :text="textFieldValue" hint="Enter City..." v-model="city" class="text-field" />
                                <ActivityIndicator :busy="work" color="#42b983" />
                                <StackLayout :visibility="weather.main ? 'visible' : 'collapsed'">
                                    <Label class="titre" :text="this.infos.name" />
                                    <Label class="text" :text="infos.main.temp + ' °C'" />
                                    <Image :src="icon" stretch="aspectFit" class="logo" />
                                    <Label class="text" :text="weather.description"  />
                                </StackLayout>
                                <Button class="button" text="City search" @tap="searchByCity" />
                        </StackLayout>
                    </ScrollView>
				</StackLayout>
			</RadSideDrawer>
		</GridLayout>
    </Page>
</template>

<script>
    import axios from 'axios';

export default {
    methods: {
        onOpenDrawerTap() {
            this.$refs.drawer.nativeView.showDrawer();
        },
        onCloseDrawerTap() {
            this.$refs.drawer.nativeView.closeDrawer();
        },
        toggleDrawer() {
            this.$refs.drawer.nativeView.toggleDrawerState();
        },
        searchByCity() {
            this.work = true;
            axios.get(this.url,
                { params: {
                    q: this.city,      
                    appid: this.key,
                }}       ).then(response => {
                    try {
                    this.work = false;
                    this.infos = response.data;
                    this.weather = this.infos.weather[0];
                    this.icon = "http://openweathermap.org/img/w/" + this.weather.icon + ".png";
                    }catch(err){
                        this.infos = { main: {}};
                        this.weather = {};
                    }
                }).catch( (err) =>{
                  console.log(err);
                });
        }
    },
    data() {
        return {
            city: "",
            weather: {},
            infos: { main: {}},
            key: "b6907d289e10d714a6e88b30761fae22",
            url: "https://openweathermap.org/data/2.5/weather",
            icon: "",
            work: false,
        };
    },
}
</script>

<style scoped>
    .page {
        background-color: white;
    }
    .home-panel {
		font-size: 20;
		margin: 15;
        vertical-align: center;
        align-items: center;
	}
	.description-label {
		margin-bottom: 15;
	}
    .text {
        text-align: center;
        color: #42b983;
        vertical-align: center;
    }
    .titre {
        text-align: center;
        color: #42b983;
        font-size: 40%;
    }
    .logo {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        width: 200px;
        height: 200px;
    }
    .button {
        width: 50%;
        background-color: #42b983;
        color: white;
    }
    .text-field {
        color: black;
        background-color: white;
        text-align: center;
    }
</style>