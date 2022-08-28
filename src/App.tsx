import { createContext, useContext, useState } from 'react';

type AccessRoles = Array<{ role: string; privileges: string[] }>;
type UserInfo = { username: string; accessRoles: AccessRoles | undefined };

export const UserContext = createContext<{
	user: UserInfo | undefined;
	onUserChange: (user: UserInfo | undefined) => void;
}>({
	user: undefined,
	onUserChange: () => null,
});

export default function App() {
	const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
	return (
		<UserContext.Provider value={{ user: userInfo, onUserChange: setUserInfo }}>
			<AuthForm />
			<UserInfoView />
		</UserContext.Provider>
	);
}

function AuthForm() {
	const { user, onUserChange: handleUserChange } = useContext(UserContext);
	const [username, setUsername] = useState('');
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const accessRoles = getRolesAndPrivilegesByUsername(username);
				handleUserChange({ username, accessRoles });
				setUsername('');
			}}
		>
			<div>
				<label htmlFor="username">
					Enter Username
					<input
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.currentTarget.value)}
						type="text"
						name="username"
						id="username"
						required
					/>
				</label>
			</div>
			<div>
				<button type="submit">Log In</button>
				{user ? (
					<button type="button" onClick={() => handleUserChange(undefined)}>
						Clear Out
					</button>
				) : null}
			</div>
		</form>
	);
}

function UserInfoView() {
	const { user } = useContext(UserContext);
	if (!user)
		return (
			<div>
				<p>User isn't logged in</p>
			</div>
		);
	return (
		<div>
			<h2>{user.username}</h2>
			<table>
				<thead>
					<tr>
						<th>Role</th>
						<th>Privileges</th>
					</tr>
				</thead>
				<TableBody />
			</table>
		</div>
	);
}

export function TableBody() {
	const { user } = useContext(UserContext);
	if (!user) return null;
	return (
		<tbody>
			{user.accessRoles?.map(({ privileges, role }, idx) => (
				<tr key={idx}>
					<td>{role}</td>
					<td>
						{privileges.map((privilege) => (
							<span
								key={privilege}
								style={{ display: 'inline-block', marginRight: 10 }}
							>
								{privilege}
							</span>
						))}
					</td>
				</tr>
			))}
		</tbody>
	);
}

export function getRolesAndPrivilegesByUsername(username: string): undefined | AccessRoles {
	const registeredUsernames: Record<string, AccessRoles> = {
		Timothy: [{ role: 'Administrator', privileges: ['edit', 'view', 'delete', 'add'] }],
		Levi: [{ role: 'Guardian', privileges: ['view'] }],
		Luke: [],
	};
	return registeredUsernames[username];
}
