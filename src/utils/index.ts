import axios from 'axios';
import moment from 'moment';
import Alert from './alert';
import MobxUtil from './MobxUtil';

class Utils {
  static makeId(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static errorLog(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('request', error.request);
      console.error('response', error.response);
    } else {
      console.error(error);
    }
  }

  static formattedDate(date: Date) {
    return moment(date).format('HH:MM YYYY:MM:DD');
  }

  static isServer() {
    let result = typeof window === 'undefined';
    return result;
  }
  static getYears(duration: number, yearInSeconds: number) {
    const rest = duration % yearInSeconds;
    const durationInSeconds = duration - rest;
    const years = durationInSeconds / yearInSeconds;

    return {
      years,
      rest,
    };
  }
  static convert(duration: number, format: string) {
    const yearInSecondsAstr = 31557600; // 31,557,600 seconds (365.25 days)
    const yearInSecondsCal = 31536000; // 31,536,000 seconds (365 days)

    const obj = {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    // if duration > 1 year : calculate years before the rest
    if (format === 'astr' && duration >= yearInSecondsAstr) {
      const res = this.getYears(duration, yearInSecondsAstr);
      obj.years = res.years; // Get years
      duration = res.rest; // Get rest
    } else if (format === 'cal' && duration >= yearInSecondsCal) {
      const res = this.getYears(duration, yearInSecondsCal);
      obj.years = res.years;
      duration = res.rest;
    }

    /// SECONDS
    if (duration < 60) {
      obj.seconds = duration;
    } else if (duration === 60) {
      obj.minutes = 1;
      obj.seconds = 0;
    } else {
      /// MINUTES
      const restSeconds = duration % 60; // Rest in secondes
      const durationSeconds = duration - restSeconds; // Duration - rest
      const minutes = durationSeconds / 60; // Total number of minutes

      if (minutes < 60) {
        obj.minutes = minutes;
        obj.seconds = restSeconds;
      } else if (minutes === 60) {
        obj.hours = 1;
        obj.minutes = 0;
        obj.seconds = restSeconds;
      } else {
        /// HOURS
        const restMinutes = minutes % 60;
        const durationMinutes = minutes - restMinutes;
        const hours = durationMinutes / 60;

        if (hours < 24) {
          obj.hours = hours;
          obj.minutes = restMinutes;
          obj.seconds = restSeconds;
        } else if (hours === 24) {
          obj.days = 1;
          obj.hours = 0;
          obj.seconds = restSeconds;
        } else {
          /// DAYS
          const restHours = hours % 24;
          const durationHours = hours - restHours;
          const days = durationHours / 24;

          obj.days = days;
          obj.hours = restHours;
          obj.minutes = restMinutes;
          obj.seconds = restSeconds;
        }
      }
    }

    return obj;
  }
}

export function getErrMsg(error: unknown) {
  let defaultMessage = 'Internel Server Error';
  let result = '';

  if (axios.isAxiosError(error)) {
    const errorMsg =
      error.response?.data.errors?.length > 0 &&
      error.response?.data.errors[0].detail;
    result = errorMsg || defaultMessage;
  } else {
    console.error(error);
  }

  return result;
}

export function log() {}

export function matchMutate(
  cache: any,
  mutate: (arg0: any) => any,
  key: string | RegExp
) {
  const regex = new RegExp(key);
  if (!(cache instanceof Map)) {
    throw new Error(
      'matchMutate requires the cache provider to be a Map instance'
    );
  }

  const keys = [];
  // @ts-ignore
  for (const key of cache.keys()) {
    if (regex.test(key)) {
      keys.push(key);
    }
  }

  const mutations = keys.map((key) => mutate(key));

  return Promise.all(mutations);
}

export { Utils, MobxUtil, Alert };
