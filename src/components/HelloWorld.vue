<template>
	<Page class="page">
		<ActionBar title="Météo" class="action-bar" />
		<ScrollView>
			<StackLayout class="home-panel">
				<StackLayout >
                    <ActivityIndicator busy="true" @busyChange="processing" :visibility="weather.main ? 'collapsed' : 'visible'"	/>
					<StackLayout :visibility="weather.main ? 'visible' : 'collapsed'">
                        <Label class="titre" :text="infos.name" />
                        <Label class="text" :text="infos.main.temp + ' °C'" />
                        <Image :src="icon" stretch="aspectFit" class="logo" />
                        <Label class="text" :text="weather.description" />
					</StackLayout>
				</StackLayout>
			</StackLayout>
		</ScrollView>
	</Page>
</template>

<script>
	import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
  const geoLocation = require("nativescript-geolocation");
  import axios from 'axios';
export default {
    methods: {
        enableLocationServices: function() {
            geoLocation.isEnabled().then(enabled => {
                if (!enabled) {
                    geoLocation.enableLocationRequest().then(() => this.showLocation());
                } else {
                    this.showLocation();
                }
            });
        },
        showLocation: function() {
            geoLocation.watchLocation(location => {
                this.currentGeoLocation = location;
                axios.get(this.url,
                { params: {
                    lat: this.currentGeoLocation.latitude,
                    lon: this.currentGeoLocation.longitude,      
                    appid: this.key,
                }}       ).then(response => {
                    this.infos = response.data;
                    this.weather = this.infos.weather[0];
                    this.icon = "http://openweathermap.org/img/w/" + this.weather.icon + ".png";
                }).catch( (err) =>{
                  console.log(err);
                })
            }, error => {
                alert(error);
            }, {
                desiredAccuracy: 3,
                updateDistance: 10,
                minimumUpdateTime: 1000 * 1
            });
        },
    },
    created: function() {
      this.enableLocationServices();
    },
    data() {
        return {
            currentGeoLocation: {
                processing: true,
                latitude: null,
                longitude: null,
                altitude: null,
                direction: null
            },
            weather: {},
            infos: { main: {}},
            city: "",
            key: "b6907d289e10d714a6e88b30761fae22",
            url: "https://openweathermap.org/data/2.5/weather",
            icon: "",
        };
    },
}
</script>

<style scoped>
	.home-panel {
		font-size: 20;
		margin: 15;
        vertical-align: center;
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
        font-size: 50px;
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
</style>