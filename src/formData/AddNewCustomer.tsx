import React, { useReducer } from 'react';

export default function AddNewCustomer() {
	const initialState = { message: '', isSubmitting: false };
	const [state, dispatch] = useReducer(addNewCustomerReducer, initialState);

	async function submitNewCustomerInfoForRegistration(event: React.FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			dispatch({ type: '@state/submitting' });
			const formData = new FormData(event.currentTarget);
			const customerInfo = {
				name: formData.get('name'),
				email: formData.get('email'),
			};
			if (!customerInfo.email || !customerInfo.name) {
				const throwableValidationError = { validationError: true };
				throw throwableValidationError;
			}

			const response = await fetch('https://customer.ytvids.com/customer', {
				method: 'POST',
				body: JSON.stringify({ customerInfo }),
			});
			dispatch({
				type: '@state/complete',
				message: response.ok
					? 'Customer added successfully without errors'
					: 'Sorry could not add the new customer. Something happened, please try again.',
			});
		} catch (error) {
			dispatch({
				type: '@state/complete',
				message: (error as any).validationError
					? 'Please ensure that the customer details is filled correctly'
					: "An unknown error occurred that we don't know about. We will look into it, please try again later.",
			});
		}
	}

	return (
		<form onSubmit={submitNewCustomerInfoForRegistration}>
			{state.message ? <p>{state.message}</p> : null}
			<label htmlFor="name">
				Name
				<input type="text" required name="name" id="name" disabled={state.isSubmitting} />
			</label>
			<label htmlFor="email">
				Email
				<input
					type="email"
					name="email"
					id="email"
					required
					disabled={state.isSubmitting}
				/>
			</label>
			<div>
				<button type="submit" disabled={state.isSubmitting}>
					Add Customer
				</button>
			</div>
		</form>
	);
}

type CustomerState = { message: string; isSubmitting: boolean };

type CustomerStateActions =
	| { type: '@state/submitting' }
	| { type: '@state/complete'; message: string };

function addNewCustomerReducer(state: CustomerState, action: CustomerStateActions): CustomerState {
	switch (action.type) {
		case '@state/complete':
			return { ...state, isSubmitting: false, message: action.message };
		case '@state/submitting':
			return { ...state, isSubmitting: true, message: '' };
		default:
			return state;
	}
}
