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
                                <Label class="text" text="City Search" />
                        </StackLayout>
                    </ScrollView>
				</StackLayout>
			</RadSideDrawer>
		</GridLayout>
    </Page>
</template>

<script>
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
        }
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
        background-color: #3e5bfe;
        color: white;
    }
</style>