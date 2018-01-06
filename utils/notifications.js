import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const NOTIFICATION_KEY = 'FlashCards:notifications';

function createNotification() {
	return {
		title: 'Hi, we are missing you',
		body: "Have you take a quiz today?",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: false,
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then((data) => {
		if(data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS)
			.then(({ status }) => {
				if(status === 'granted') {
					Notifications.cancelAllScheduledNotificationsAsync()

					let tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1)
					tomorrow.setHours(18)
					tomorrow.setMinutes(30)

					Notifications.scheduleLocalNotificationAsync(
						createNotification(),
						{
							time: tomorrow,
							repeat: 'day'
						}
					)

					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
				}
			})
		}
	})
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
	.then(Notifications.cancelAllScheduledNotificationsAsync)
}