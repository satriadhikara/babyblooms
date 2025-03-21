import { CalendarHeart } from "lucide-react-native";
import { TouchableOpacity, View, Text } from "react-native";
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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Ensure the selected date is not before minimum date
      if (selectedDate >= minimumDate) {
        onDateChange(selectedDate);
      } else {
        onDateChange(minimumDate);
      }
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

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
            color: "#CCCCCC",
          }}
        >
          {`${date.getDate().toString().padStart(2, "0")}-${(
            date.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`}
        </Text>
      </TouchableOpacity>

      {/* Show date picker only when button is pressed */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

export default DatePickerButton;
