import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  FlatList as FlatListType,
} from 'react-native';

// Constants
import { WIDTH, HEIGHT, isTV } from '../../../constants/Layout';
import FontScale from '../../../constants/FontScale';
import Theme from '../../../constants/Theme';

// Interface
import { IEpg } from '../../../Interface/epg';

// Library
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

interface BarDayProps {
  epgItems: IEpg[];
  filterSchedulesByDate: (dateStr: string) => void;
  selectTime: string;
}

const BUTTON_WIDTH = WIDTH / 5;
const BarDay: React.FC<BarDayProps> = ({
  epgItems,
  filterSchedulesByDate,
  selectTime,
}) => {
  const [updData, setUpdData] = useState<string[]>([]);

  const listRef = useRef<FlatListType<string>>(null);
  useEffect(() => {
    if (selectTime) {
      const index = updData.indexOf(selectTime);
      handlePress(index);
    }
  }, [selectTime]);

  useEffect(() => {
    const uniqDateList = extractUniqueSortedDates(epgItems);
    setUpdData(['', '', ...uniqDateList, '', '']);
  }, []);

  const extractUniqueSortedDates = (data: IEpg[]): string[] => {
    let dateSet: string[] = [];

    for (const channel of data) {
      for (const schedule of channel.schedules) {
        const dateKey = new Date(schedule.start).toISOString().split('T')[0];
        if (!dateSet.includes(dateKey)) dateSet = [...dateSet, dateKey];
      }
    }

    return Array.from(dateSet).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
  };

  const handlePress = (index: number) => {
    const offset = index * BUTTON_WIDTH - (WIDTH / 2 - BUTTON_WIDTH / 2);
    listRef.current?.scrollToOffset({ offset, animated: true });
    const selectTimeNew = updData[index];
    filterSchedulesByDate(selectTimeNew);
  };
  const formatDateToCustom = (dateString: string) => {
    if (!dateString.trim()) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

    const dayOfWeek = DAYS[date.getDay()];
    const dayNum = date.getDate();
    const monthNum = date.getMonth() + 1;

    return (
      <View
        style={
          dateString === selectTime
            ? styles.contentTextSelect
            : styles.contentText
        }
      >
        <Text style={styles.labelDay}>{`${dayOfWeek}`}</Text>
        <Text style={styles.labelDate}>{`${dayNum}.${monthNum}`}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.contLogo}>
        <View style={styles.IconContainer}>
          <MaterialIcons
            name="star-border"
            color="#fff"
            size={FontScale.xLarge}
          />
        </View>
      </View>
      <FlatList
        ref={listRef}
        data={updData}
        horizontal
        snapToInterval={BUTTON_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress(index)}
          >
            {formatDateToCustom(item)}
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.066,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  labelDay: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FontScale.medium,
  },
  contentText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: HEIGHT * 0.001,
    paddingHorizontal: WIDTH * 0.03,
    height: '100%',
  },
  contentTextSelect: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: Theme.redSoft,
    borderStyle: 'solid',
    paddingHorizontal: WIDTH * 0.03,
    height: '100%',
  },
  labelDate: {
    color: '#fff',
    fontWeight: '600',
  },
  IconContainer: {
    flexDirection: 'row',
    paddingTop: HEIGHT * 0.02,
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: Theme.softPink,
    borderRightColor: Theme.softPink,
    borderStyle: 'solid',
    backgroundColor: '#222',
    borderTopWidth: 2,

    height: isTV ? HEIGHT * 0.09 : HEIGHT * 0.066,
    width: isTV ? WIDTH * 0.1 : WIDTH * 0.2,
  },
  contLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: WIDTH * 0.2,
    zIndex: 1,
  },
});

export default BarDay;
