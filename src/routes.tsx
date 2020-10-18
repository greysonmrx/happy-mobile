import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from './pages/Onboarding';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanageVisitation from './pages/CreateOrphanage/OrphanageVisitation';
import OrphanageCreate from './pages/CreateOrphanage/OrphanageCreate';
import OrphanageCancelCreation from './pages/CreateOrphanage/OrphanageCancelCreation';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator 
        mode="modal"
        initialRouteName="Onboarding"
        screenOptions={{ 
          headerShown: false,
          cardStyle: {
            backgroundColor: '#F2F3F5',
          },
        }}
      >
        <Screen component={Onboarding} name="Onboarding"/>

        <Screen component={OrphanagesMap} name="OrphanagesMap" />

        <Screen 
          component={OrphanageDetails} 
          name="OrphanageDetails" 
          options={{
            headerShown: true,
            header: () => <Header cancelable={false} title="Orfanato" />,
          }}
        />

        <Screen 
          component={SelectMapPosition} 
          name="SelectMapPosition"
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />

        <Screen 
          component={OrphanageData} 
          name="OrphanageData"
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />

        <Screen
          component={OrphanageVisitation}
          name="OrphanageVisitation"
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />

        <Screen component={OrphanageCreate} name="OrphanageCreate" />

        <Screen component={OrphanageCancelCreation} name="OrphanageCancelCreation" />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;