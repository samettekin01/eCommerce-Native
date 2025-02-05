import Icon from 'react-native-vector-icons/MaterialIcons'
import { useEffect, useState } from "react"
import { UserInformation } from "@/app/types/types"
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Input, Text } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store'
import { getUser, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice'
import { NavigationProp } from '@react-navigation/native'

export default function SignUp({ navigation }: { navigation: NavigationProp<any> }) {

    const [user, setUser] = useState<UserInformation>({
        name: "",
        mail: "",
        pass: "",
    })
    const [isThereUser, setIsThereUser] = useState<boolean>(false)
    const [error, setError] = useState('');
    const { isThereUserState } = useAppSelector(state => state.status);

    const dispatch = useAppDispatch()

    const handleSignUp = async () => {
        if (!user.name) {
            setError("Don't leave this field empty");
        } else {
            try {
                await AsyncStorage.setItem("user", JSON.stringify(user))
                dispatch(getUser())
                navigation.navigate("Home")
                setError('')
            } catch (e) {
                console.log("An error occurred while saving the user: ", e)
            }
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.setItem('user', '');
        dispatch(setIsLogoutMenuOpen(false));
        dispatch(getUser());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Root', params: { screen: 'MainPage' } }],
        })
    }

    useEffect(() => {
        const getUserFromStorage = async () => {
            const user = await AsyncStorage.getItem("user")
            if (user) {
                setIsThereUser(true)
            } else {
                setIsThereUser(false)
                dispatch(setIsLogoutMenuOpen(false));
                dispatch(getUser());
            }
        }
        getUserFromStorage()
    }, [isThereUser, dispatch])

    return (
        <View style={styles.container}>
            {isThereUserState && isThereUserState?.name  && <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
                <Icon name="logout" size={20} color="#000" />
                <Text style={styles.logoutbutton}>Logout</Text>
            </TouchableOpacity>}
            <View style={styles.inputsContainer}>
                <Text h2 style={styles.headerText}>{isThereUserState && isThereUserState.name ? "Edit Profile" : "Sign Up"}</Text>
                <View style={styles.inputContainer}>
                    <Input
                        value={user.name}
                        placeholder="Name"
                        leftIcon={<Icon name='person' size={30} />}
                        onChangeText={text => setUser({ ...user, name: text })}
                        autoFocus={true}

                    />
                    {error && <Text>{error}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        value={user.mail}
                        placeholder='Mail'
                        leftIcon={<Icon name='mail' size={30} />}
                        onChangeText={text => setUser({ ...user, mail: text })}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        secureTextEntry
                        value={user.pass}
                        placeholder='Password'
                        leftIcon={<Icon name='password' size={30} />}
                        onChangeText={text => setUser({ ...user, pass: text })}
                    />
                </View>
                <Button onPress={handleSignUp} buttonStyle={styles.button}>
                    Submit
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        width: "100%", height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    },
    inputsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 2,
        padding: 10
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%"
    },
    button: {
        width: Dimensions.get("window").width / 2,
        textAlign: "center",
        marginTop: 10
    },
    buttonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    logoutbutton: {
        textAlign: 'left',
        fontSize: 18
    },
})