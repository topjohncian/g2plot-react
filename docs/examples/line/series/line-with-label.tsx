import React, { useState, useEffect } from 'react'
import { LineChart } from '@opd/g2plot-react'
import { LineConfig } from '@antv/g2plot'

const config: LineConfig = {
  title: {
    visible: true,
    text: '2000 ~ 2018 年各国家 GDP 趋势对比',
  },
  description: {
    visible: true,
    text:
      '图形标签 (label) 位于折线尾部，用于标注整根折线，并有带有排名的含义在其中。',
  },
  padding: [20, 100, 30, 80],
  forceFit: true,
  xField: 'year',
  yField: 'gdp',
  seriesField: 'name',
  xAxis: {
    type: 'time',
    mask: 'YYYY',
    label: {
      visible: true,
      autoHide: true,
    },
  },
  yAxis: {
    // eslint-disable-next-line
    // @ts-ignore
    formatter: (name: string) => `${(+name / 10e8).toFixed(1)} B`,
    // label: {
    //   formatter: (name: string) => `${(+name / 10e8).toFixed(1)} B`,
    // },
  },
  legend: {
    visible: false,
  },
  label: {
    visible: true,
    type: 'line',
  },
  animation: {
    enter: {
      animation: 'clipingWithData',
    },
  },
  smooth: true,
}

const LabelLine = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    let active = true
    fetch('https://g2plot.antv.vision/zh/examples/data/GDP.json')
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setData(data)
        }
      })
    return () => {
      active = false
    }
  }, [])

  return <LineChart {...config} data={data} />
}

export default LabelLine
