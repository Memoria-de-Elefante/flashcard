import React, { Children, useState } from 'react';
import { Text, Dimensions, StyleSheet, SafeAreaView, View, TextInput} from 'react-native';
import CustomButton from '../components/CustomButton'

type Props = {
    title?: string;
    isOpen: boolean;
    onSave: () => void;
    onClose: () => void;
};

const ModalComponent = ({ title, onSave, onClose, isOpen=false }: Props) => {    
    if (!isOpen) {
        return null;
    }
    
    return (
        <SafeAreaView style={styles.modalOverlay}>
            <SafeAreaView style={styles.modalHeader}>
                <Text>{title}</Text>
            </SafeAreaView>
            <HorizontalLine/>
            <SafeAreaView style={styles.modalBody}>

            </SafeAreaView>
            <SafeAreaView style={styles.modalFooter}>
                <CustomButton
                    title="Fechar"
                    width={100}
                    height={60}
                    borderRadius={5}
                    onPress={onClose}
                />
            </SafeAreaView>
        </SafeAreaView>
    );
};

const HorizontalLine = () => {
    return (
        <View style={styles.horizontalLine}/>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    modalHeader: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    modalBody: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    modalFooter: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 0,
        paddingBottom: 0,
        flexDirection: 'column',
    },
    horizontalLine: {
        backgroundColor: '#000000',
        height: 5
    }
})

export default ModalComponent;