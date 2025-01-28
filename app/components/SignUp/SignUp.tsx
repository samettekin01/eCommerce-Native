import Icon from 'react-native-vector-icons/MaterialIcons'
import { useEffect, useState } from "react"
import { UserInformation } from "@/app/types/types"
import { Dimensions, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch } from '@/app/redux/store/store'
import { getUser, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice'
import { router } from 'expo-router'

function SignUp() {

    const [user, setUser] = useState<UserInformation>({
        name: "",
        mail: "",
        pass: "",
    })
    const [isThereUser, setIsThereUser] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleSignUp = async () => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(user))
            dispatch(getUser())
            router.navigate("/")
        } catch (e) {
            console.log("An error occurred while saving the user: ", e)
        }
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
            <View style={styles.inputsContainer}>
                <Text h2 style={styles.headerText}>{isThereUser ? "Edit Profile" : "Sign Up"}</Text>
                <View style={styles.inputContainer}>
                    <Input
                        value={user.name}
                        placeholder="Name"
                        leftIcon={<Icon name='person' size={30} />}
                        onChangeText={text => setUser({ ...user, name: text })}
                        autoFocus={true}
                    />
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
    }
})

export default SignUp