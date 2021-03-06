import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "parseDuration",
})
export class ParseDurationPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value) {
      return this, this.parseDuration(value);
    }
    return null;
  }

  parseDuration(value: string) {
    // parse all formats of duration ....
    let output = [];
    let durationInSec = 0;
    const matches = value.match(
      /P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)W)?(?:(\d*)D)?T(?:(\d*)H)?(?:(\d*)M)?(?:(\d*)S)?/i
    );
    let parts = [
      {
        // years
        pos: 1,
        multiplier: 86400 * 365,
      },
      {
        // months
        pos: 2,
        multiplier: 86400 * 30,
      },
      {
        // weeks
        pos: 3,
        multiplier: 604800,
      },
      {
        // days
        pos: 4,
        multiplier: 86400,
      },
      {
        // hours
        pos: 5,
        multiplier: 3600,
      },
      {
        // minutes
        pos: 6,
        multiplier: 60,
      },
      {
        // seconds
        pos: 7,
        multiplier: 1,
      },
    ];

    for (let i = 0; i < parts.length; i++) {
      if (typeof matches[parts[i].pos] != "undefined") {
        durationInSec += parseInt(matches[parts[i].pos]) * parts[i].multiplier;
      }
    }

    // Hours extraction
    if (durationInSec > 3599) {
      output.push(parseInt(`${durationInSec / 3600}`));
      durationInSec %= 3600;
    }
    // Minutes extraction with leading zero
    output.push(("0" + parseInt(`${durationInSec / 60}`)).slice(-2));
    // Seconds extraction with leading zero
    output.push(("0" + (durationInSec % 60)).slice(-2));

    return output.join(":");
  }
}
