import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager"
import { Inject, Injectable, Logger } from "@nestjs/common"
import axios from "axios"
import * as dayjs from "dayjs"
import { JSDOM } from "jsdom"

import { TimeSlotEntity } from "./entity/timeSlot.entity"

interface BookingDetails {
  year: number
  month: number
  day: number
  start: string
  end: string
}

@Injectable()
export class CrewlerService {
  logger = new Logger(CrewlerService.name)

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   *
   * @param year  currentYear
   * @param month  currMonth <= month <= 12
   * @param day  currentDay <= day <= 31
   * @returns TimeSlotEntity[]
   */
  async crewAlphaEgertonBookings(year: number, month: number, day: number): Promise<TimeSlotEntity[]> {
    const value = await this.cacheManager.get<TimeSlotEntity[]>(`alpha-egerton-${year}-${month}-${day}`)
    if (value) {
      return value
    }

    this.logger.log(`crewling time slots for ${year}-${month}-${day} from website`)
    const { data } = await axios.get("https://alphabadminton.yepbooking.com.au/ajax/ajax.schema.php", {
      params: {
        day,
        month,
        year,
        id_sport: 2,
        default_view: "day"
      }
    })

    const timeSlots = this.parseTimeSlots(data, { year, month, day })
    await this.cacheManager.set(`alpha-egerton-${year}-${month}-${day}`, timeSlots, 60 * 1000)
    return timeSlots
  }

  parseTimeSlots(html: string, { year, month, day }: { year: number; month: number; day: number }): TimeSlotEntity[] {
    const dom = new JSDOM(html)
    const document = dom.window.document

    let timeSlotsOfAllCourts: TimeSlotEntity[] = []
    const courtRows = document.querySelectorAll(".schemaWrapper tr")

    let rowNumber = 0
    for (const rowIdx in courtRows) {
      const courtRow = courtRows[rowIdx]
      if (courtRow?.className?.startsWith("trSchemaLane_")) {
        rowNumber++
        const courtString = this.parseCourtFromClassName(rowNumber)
        const timeSlotsOfOneCourt = this.parseCourtTimeSlotFromHtmlString(courtRow, year, month, day, courtString)
        timeSlotsOfAllCourts = timeSlotsOfAllCourts.concat(timeSlotsOfOneCourt)
      }
    }

    return timeSlotsOfAllCourts
  }

  parseCourtFromClassName(rowNumber: number) {
    let courtString = `${rowNumber}`
    if (rowNumber > 26) {
      courtString = `VIP ${rowNumber - 26}`
    }
    return courtString
  }

  parseCourtTimeSlotFromHtmlString(
    element: Element,
    year: number,
    month: number,
    day: number,
    courtString: string
  ): TimeSlotEntity[] {
    const cols = element.querySelectorAll("td")

    const timeSlots: TimeSlotEntity[] = []
    for (const col of cols) {
      let timeRangeInString = col.title.split(" - ")[0]
      const available = col.classList.contains("booked") ? false : true
      if (!timeRangeInString) {
        timeRangeInString = col.querySelector("a").title.split(" - ")[0]
      }

      const [start, end] = timeRangeInString.split("–")

      const { startTime, endTime } = this.parseBookingToDayjs({ year, month, day, start, end })

      timeSlots.push({ start: startTime, end: endTime, court: courtString, available })
    }

    return timeSlots
  }

  parseBookingToDayjs(booking: BookingDetails) {
    const { year, month, day, start, end } = booking

    // Create dayjs objects for start and end times
    const startTime = dayjs.tz(`${year}-${month}-${day} ${start}`, "YYYY-M-D h:mma", "Australia/Sydney").utc().valueOf()
    const endTime = dayjs.tz(`${year}-${month}-${day} ${end}`, "YYYY-M-D h:mma", "Australia/Sydney").utc().valueOf()

    return { startTime, endTime }
  }
}
