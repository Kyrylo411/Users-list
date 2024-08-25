export const validateForm = (
	name: string,
	email: string,
	phone: string,
	position: string | null,
	photo: File | null
) => {
	const errors: { [key: string]: string } = {};

	if (!name || name.length < 2 || name.length > 60) {
		errors.name = 'Name must be between 2 and 60 characters';
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email || !emailRegex.test(email)) {
		errors.email = 'Please enter a valid email address';
	}

	const phoneRegex = /^\+380\d{9}$/;
	if (!phone || !phoneRegex.test(phone)) {
		errors.phone = 'Phone number must start with +380 and contain 9 digits';
	}

	if (!position) {
		errors.position = 'Please select a position';
	}

	if (!photo) {
		errors.photo = 'Please upload a photo';
	} else {
		if (!['image/jpeg', 'image/jpg'].includes(photo.type)) {
			errors.photo = 'Photo must be a jpeg/jpg image';
		}
		if (photo.size > 5 * 1024 * 1024) {
			errors.photo = 'Photo must not exceed 5MB';
		}
	}

	return errors;
};