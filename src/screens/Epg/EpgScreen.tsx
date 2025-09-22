import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

// Constants
import { HEIGHT, WIDTH, isTV } from '../../constants/Layout';
import Theme from '../../constants/Theme';
import fontScale from '../../constants/FontScale';

// Module
import BarDay from './components/BarDay';
import BarChannel from './components/BarChannel';
import EpisodeList from './components/EpisodeList';

// Interface
import { IEpg } from '../../Interface/epg';

const EpgScreen: React.FC<{ epgItems: IEpg[] }> = ({ epgItems }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [lineMove, setLineMove] = useState<number>(0);
  const [selectTime, setSelectTime] = useState<string>('');
  const [filterData, setFilterData] = useState<IEpg[]>([]);

  const currentDate = new Date();

  useEffect(() => {
    const formatoISO = currentDate.toISOString().split('T')[0];
    filterSchedulesByDate(formatoISO);
    timeToWidth();
  }, []);

  const filterSchedulesByDate = (dateStr: string) => {
    Promise.resolve().then(() => {
      const targetDate = new Date(dateStr);

      const targetYear = targetDate.getUTCFullYear();
      const targetMonth = targetDate.getUTCMonth();
      const targetDay = targetDate.getUTCDate();

      const updDataByDay = epgItems
        .map(channel => {
          const filteredSchedules = channel.schedules.filter(schedule => {
            const startDate = new Date(schedule.start);
            const endDate = new Date(schedule.end);

            const matchStart =
              startDate.getUTCFullYear() === targetYear &&
              startDate.getUTCMonth() === targetMonth &&
              startDate.getUTCDate() === targetDay;

            const matchEnd =
              endDate.getUTCFullYear() === targetYear &&
              endDate.getUTCMonth() === targetMonth &&
              endDate.getUTCDate() === targetDay;

            return matchStart || matchEnd;
          });

          return {
            ...channel,
            schedules: filteredSchedules,
          };
        })
        .filter(channel => channel.schedules.length > 0);
      setSelectTime(dateStr);
      setFilterData(updDataByDay);
    });
  };

  const timeToWidth = () => {
    const now = currentDate;

    const pad = (n: number) => n.toString().padStart(2, '0');

    const time = `${pad(now.getHours() === 0 ? 24 : now.getHours())}:${pad(
      now.getMinutes(),
    )}`;
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate(),
    )}`;
    const [hours, minutes] = time.split(':').map(Number);
    let widthMove = 0;
    if (hours >= 1 && hours <= 4) {
      widthMove = hours + minutes / 60 + 18.5;
    } else {
      widthMove = hours + minutes / 60 - 5.5;
    }

    scrollRef.current?.scrollTo({ x: WIDTH * widthMove, animated: true });
    setLineMove(WIDTH * widthMove + WIDTH * 0.5);

    setSelectTime(date);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <BarChannel filterData={filterData} />
            <BarDay
              epgItems={epgItems}
              selectTime={selectTime}
              filterSchedulesByDate={filterSchedulesByDate}
            />
            <ScrollView horizontal ref={scrollRef}>
              <EpisodeList
                filterData={filterData}
                selectTime={selectTime}
                currentDate={currentDate}
                lineMove={lineMove}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => timeToWidth()}
      >
        <MaterialIcons
          name="access-time"
          color="#fff"
          size={isTV ? fontScale.huge : fontScale.megaLarge}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  floatingButton: {
    position: 'absolute',
    bottom: isTV ? 60 : 30,
    right: isTV ? 40 : 20,
    backgroundColor: Theme.redSoft,
    width: isTV ? WIDTH * 0.08 : WIDTH * 0.16,
    height: isTV ? HEIGHT * 0.14 : HEIGHT * 0.07,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'android' && { elevation: 5 }),
    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    }),
  },
});
export default EpgScreen;
