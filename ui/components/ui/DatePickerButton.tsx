import { CalendarHeart } from "lucide-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  Modal,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

interface DatePickerButtonProps {
  date: Date;
  onDateChange: (date: Date) => void;
  minimumDate: Date;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  onDateChange,
  minimumDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(date);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        // Ensure the selected date is not before minimum date
        if (selectedDate >= minimumDate) {
          onDateChange(selectedDate);
        } else {
          onDateChange(minimumDate);
        }
      }
    } else {
      // On iOS, just update the temporary date
      if (selectedDate) {
        if (selectedDate >= minimumDate) {
          setTempDate(selectedDate);
        } else {
          setTempDate(minimumDate);
        }
      }
    }
  };

  const confirmIOSDate = () => {
    setShowDatePicker(false);
    onDateChange(tempDate);
  };

  const cancelIOSDate = () => {
    setShowDatePicker(false);
    setTempDate(date); // Reset temp date
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    setTempDate(date); // Initialize temp date
  };

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  return (
    <View>
      {/* Date trigger button with icon and text side by side */}
      <TouchableOpacity
        onPress={toggleDatePicker}
        style={{
          backgroundColor: "white",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#CCCCCC",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <CalendarHeart color="#373737" size={20} />
        <Text
          style={{
            fontFamily: "Switzer-Regular",
            fontSize: 16,
            color: "#333",
          }}
        >
          {formattedDate}
        </Text>
      </TouchableOpacity>

      {/* Android date picker */}
      {showDatePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          minimumDate={minimumDate}
        />
      )}

      {/* iOS date picker in a drawer-like modal */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={cancelIOSDate}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmIOSDate}>
                  <Text style={styles.confirmText}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  cancelText: {
    color: "#999",
    fontSize: 16,
    fontFamily: "Switzer-Regular",
  },
  confirmText: {
    color: "#D33995",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Switzer-Medium",
  },
  picker: {
    height: 200,
  },
});

export default DatePickerButton;
