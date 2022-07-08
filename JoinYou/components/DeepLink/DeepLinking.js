const Deeplink = () => {

const [data, setData] = useState(null);

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }
  useEffect(() => {
      async function getInitialURL() {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) setData(Linking.parse(initialUrl));
      }
      
    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }

    return () => {  
      Linking.removeEventListener("url");
    };

  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {data ? JSON.stringify(data) : "DeepLink Navigation JoinYou"}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Deeplink;