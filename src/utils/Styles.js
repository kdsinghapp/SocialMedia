import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: '#352C48',
    height: 55,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: '#7756FC',
    marginTop:'30%'
  },
  line:{
    textDecorationLine:'line-through',},
    txtHeading:{
fontWeight:'700',
fontSize:24,
lineHeight:26,
color:'#000'
    },
    txtsubHeading:{
        fontWeight:'400',
        fontSize:14,
        lineHeight:24,
        color:'#9DB2BF',
        textAlign:'center'
    },
    tabBtn:{
        height:60,
position:'absolute',
bottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 60,
        marginTop: 25,
       
        width: '100%',
      
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        elevation: 1,
        backgroundColor: '#352C48',
      },
      
      shadow:{shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      
      elevation: 5,
    }
})