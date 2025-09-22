import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Constants
import { WIDTH, HEIGHT, isTV } from '../../../constants/Layout';
import Theme from '../../../constants/Theme';

// Interface
import { ISchedules, IEpg } from '../../../Interface/epg';

// Module
import BarHour from './BarHour';

interface EpisodeListProps {
  filterData: IEpg[];
  currentDate: Date;
  selectTime: string;
  lineMove: number;
}
const EpisodeList: React.FC<EpisodeListProps> = ({
  lineMove,
  filterData,
  selectTime,
  currentDate,
}) => {
  const formattedDate = currentDate.toLocaleDateString('en-CA');
  const timestamp = currentDate.getTime();

  const getWidthFromTimestamps = (start: number, end: number) => {
    const HOUR_WIDTH = WIDTH * 0.5;
    const DAY_WIDTH = HOUR_WIDTH * 48;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const startSeconds =
      startDate.getHours() * 3600 +
      startDate.getMinutes() * 60 +
      startDate.getSeconds();
    const endSeconds =
      endDate.getHours() * 3600 +
      endDate.getMinutes() * 60 +
      endDate.getSeconds();

    const durationSeconds = endSeconds - startSeconds;
    const width = (durationSeconds / (24 * 3600)) * DAY_WIDTH;

    return width;
  };
  const handleRenderSchedules = (data: ISchedules[]) => {
    return (
      <View style={styles.itemSchedules}>
        {data.map((item, index) => {
          const CalcWidth = getWidthFromTimestamps(item.start, item.end);

          let selectItem = false;
          if (timestamp >= item.start && timestamp <= item.end) {
            selectItem = true;
          }

          return (
            <View
              key={`item-${index}`}
              style={[
                styles.cardSchedules,
                { width: CalcWidth },
                selectItem
                  ? { backgroundColor: Theme.darkGray5 }
                  : { backgroundColor: Theme.darkGray3 },
              ]}
            >
              <View>
                <Text numberOfLines={2} style={styles.textTitle}>
                  {item.title}
                </Text>
                <Text numberOfLines={2} style={styles.textDate}>
                  {new Date(item.start).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  -
                  {new Date(item.end).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  const createNewItem = (items: ISchedules[]): ISchedules[] => {
    let data: ISchedules[] = [];
    let lastItem = {
      id: '',
      title: '',
      start: 0,
      end: 0,
    };
    for (let item of items) {
      if (lastItem.start === 0) {
        const date = new Date(items[0].start);
        if (date.getHours() === 5 && date.getMinutes() === 0) {
          data = [item];
        } else {
          date.setHours(5, 0, 0, 0);
          const newItem = {
            id: `program_${Date.now()}_${Math.random()
              .toString(36)
              .slice(2, 8)}`,
            title: 'Service Paused',
            start: date.getTime(),
            end: items[0].start,
          };
          data = [newItem, item];
        }
      } else {
        if (item.start === lastItem.end) {
          data = [...data, item];
        } else {
          data = [
            ...data,
            {
              id: `program_${Date.now()}_${Math.random()
                .toString(36)
                .slice(2, 8)}`,
              title: 'Service Paused',
              start: lastItem.end,
              end: item.start,
            },
            item,
          ];
        }
      }
      lastItem = item;
    }

    return data;
  };
  return (
    <View style={styles.contEpisode}>
      {formattedDate === selectTime && (
        <View style={[styles.floatingLine, { left: lineMove }]}>
          <View style={styles.floatingLineBold} />
        </View>
      )}
      <BarHour />
      <FlatList
        data={filterData}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listEpisodes}
        renderItem={({ item }) => {
          const schedules = createNewItem(item.schedules);
          return (
            <View style={styles.EpgItem}>
              {handleRenderSchedules(schedules)}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contEpisode: {
    position: 'relative',
  },
  floatingLine: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: 4,
    backgroundColor: Theme.redSoft,
    transform: [{ translateX: -1 }],
    pointerEvents: 'none',
    zIndex: 10,
  },
  floatingLineBold: {
    position: 'absolute',
    top: 0,
    left: isTV ? -8 : -2,
    width: WIDTH * 0.02,
    height: HEIGHT * 0.04,
    backgroundColor: Theme.redSoft,
  },
  listEpisodes: {
    flexDirection: 'column',
    width: WIDTH * 24,
  },
  EpgItem: {
    flexDirection: 'row',
    backgroundColor: Theme.darkGray3,
    height: isTV ? HEIGHT * 0.12 : HEIGHT * 0.087,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: Theme.gray,
  },
  itemSchedules: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.darkGray3,
    borderRightWidth: 2,
    borderColor: Theme.gray,
    borderStyle: 'solid',
  },
  cardSchedules: {
    borderRightWidth: 2,
    borderColor: Theme.gray,
    borderStyle: 'solid',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WIDTH * 0.024,
    paddingHorizontal: HEIGHT * 0.024,
  },

  textTitle: {
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  textDate: {
    color: '#fff',
    alignItems: 'center',
  },
});

export default EpisodeList;
