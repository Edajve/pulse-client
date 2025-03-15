import {Alert, Image, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import icons from "../../constants/icons";
import {router, usePathname} from "expo-router";
import { getTranslation } from "../../constants/translations/translations";
import BlurModalOk from "./BlurModalOk";

const SearchInput = ({initialQuery}) => {
    const [popUp, setPopUp] = useState()
    const [popUpMessage, setPopUpMessage] = useState("")

    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')

    
    const closePopUp = () => {
        setPopUp(false);
        setPopUpMessage("");
    };

    return (
        <>
            {popUp && 
                <BlurModalOk
                    visible={popUp}
                    onRequestClose={() => closePopUp()}
                    title={popUpMessage}
                    affirmativeButtonTitle='OK'
                    onYes={() => closePopUp()}
                />}
        <View
            className='border-2
                border-black-200
                w-full
                h-16
                px-4
                bg-black-100
                rounded-2xl
                focus:border-secondary
                items-center
                flex-row
                space-x-4
                mt-5'
        >
            <TextInput
                className='text-base text-white flex-1 font-pregular'
                value={query}
                placeholder={getTranslation('consent.searchFilterText')}
                placeholderText="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
            />
            <View className={'mt-1.5'}>

                <TouchableOpacity
                    onPress={() => {
                        if (!query) {
                                setPopUpMessage("Please put in a name to search by")
                                setPopUp(true)
                        }
                        

                        else if (pathname.startsWith('/search')) router.setParams({query})
                        else router.push(`/search/${query}`)
                    }}
                >
                    <Image
                        source={icons.search}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
};

export default SearchInput;