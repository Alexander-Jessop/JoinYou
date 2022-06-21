import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { Avatar, Card } from "react-native-paper";

//https://www.npmjs.com/package/react-native-calendars

const AgendaPlanner = () => {
  const [items, setItems] = useState([]);

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.cookies ? `cookie` : `nocookie`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Agenda items={items} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {},
});
//   const renderItem = (item) => {
//     return (
//       <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
//         <Card>
//           <Card.Content>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Text>{item.name}</Text>
//               <Avatar.Text
//                 label="N/A" /*Replace N/A with profile photo of scheduled client*/
//               />
//               <Button title="Join" />
//             </View>
//           </Card.Content>
//         </Card>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Agenda
//         items={items}
//         loadItemsForMonth={loadItems}
//         selected={"2022-04-28"} /*'today's date'*/
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

export default AgendaPlanner;
