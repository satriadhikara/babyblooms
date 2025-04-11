import { CalendarHeart } from "lucide-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback, // Keep for tap outside functionality
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";

interface DatePickerButtonProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  onDateChange,
  minimumDate,
  maximumDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [tempDate, setTempDate] = useState<Date>(date || new Date());

  // Keep tempDate synchronized with the date prop if it changes externally
  useEffect(() => {
    if (!showDatePicker) {
      setTempDate(date || new Date());
    }
  }, [date, showDatePicker]);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && selectedDate) {
        onDateChange(selectedDate);
      } else if (event.type === "dismissed") {
        // Optional: Handle dismissal if needed
      }
    } else {
      // iOS updates tempDate live
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmIOSDate = () => {
    setShowDatePicker(false);
    onDateChange(tempDate);
  };

  const cancelIOSDate = () => {
    setShowDatePicker(false);
    setTempDate(date || new Date()); // Reset tempDate on cancel
  };

  const toggleDatePicker = () => {
    setTempDate(date || new Date()); // Reset tempDate to current confirmed date on open
    setShowDatePicker(!showDatePicker);
  };

  const formattedDate = date
    ? `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`
    : "Pilih Tanggal";

  const pickerValue = tempDate;

  return (
    <View>
      {/* --- Button --- */}
      <TouchableOpacity
        onPress={toggleDatePicker}
        style={{
          // Original button styles
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
            // Original text styles
            fontFamily: "Switzer-Regular",
            fontSize: 16,
            color: "#333",
          }}
        >
          {formattedDate}
        </Text>
      </TouchableOpacity>

      {/* --- Android Picker --- */}
      {showDatePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={pickerValue}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate} // Pass maximumDate
        />
      )}

      {/* --- iOS Picker Modal --- */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={cancelIOSDate}
        >
          {/* Use TouchableWithoutFeedback for tap-outside-to-cancel */}
          <TouchableWithoutFeedback onPress={cancelIOSDate}>
            {/* Apply original modal container style */}
            <View style={styles.modalContainer}>
              {/* Prevent taps inside the picker container from closing */}
              <TouchableWithoutFeedback>
                {/* Apply original picker container style */}
                <View style={styles.pickerContainer}>
                  {/* Apply original picker header style */}
                  <View style={styles.pickerHeader}>
                    <TouchableOpacity onPress={cancelIOSDate}>
                      {/* Apply original cancel text style */}
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={confirmIOSDate}>
                      {/* Apply original confirm text style */}
                      <Text style={styles.confirmText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={pickerValue}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate} // Pass maximumDate
                    style={styles.picker} // Apply original picker style
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

// --- Original StyleSheet ---
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // Original background overlay
  },
  pickerContainer: {
    backgroundColor: "white", // Original background
    borderTopLeftRadius: 20, // Original radius
    borderTopRightRadius: 20, // Original radius
    paddingBottom: 20, // Original padding
    // Removed explicit center alignment if not needed by original design
    // justifyContent: "center",
    alignItems: "center",
  },
  pickerHeader: {
    flexDirection: "row",
    width: "100%", // Original width
    justifyContent: "space-between",
    padding: 16, // Original padding
    borderBottomWidth: 1, // Original border
    borderBottomColor: "#EEEEEE", // Original border color
  },
  cancelText: {
    color: "#999", // Original color
    fontSize: 16, // Original size
    fontFamily: "Switzer-Regular", // Original font
  },
  confirmText: {
    color: "#D33995", // Original color
    fontSize: 16, // Original size
    fontWeight: "500", // Original weight
    fontFamily: "Switzer-Medium", // Original font
  },
  picker: {
    height: 200, // Original height
    width: "100%", // Ensure picker takes width within its container
    // backgroundColor: 'white' // Can be set if needed, but often inherits
  },
});

export default DatePickerButton;
