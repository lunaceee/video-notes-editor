import BaseButton from '../components/BaseButton';
import Card from '../components/Card';
import BaseIcon from '../components/BaseIcon';

export default {
	install(Vue) {
		Vue.component(BaseButton.name, BaseButton);
		Vue.component(Card.name, Card);
		Vue.component(BaseIcon.name, BaseIcon);
	}
};
