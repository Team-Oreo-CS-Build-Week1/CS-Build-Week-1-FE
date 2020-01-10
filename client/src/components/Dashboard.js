import React, { useEffect, useState } from 'react';
import axiosWithAuth from "../authentication/axiosWithAuth";

function Dashboard() {
  const [array, setArray] = useState([]);
  const [selected, setSelected] = useState({id: ""});

  useEffect(() => {
    console.log('TOKEN', localStorage.getItem('token'))
    axiosWithAuth()
    .get('https://mud-game-oreo.herokuapp.com/api/adv/rooms')
    .then(res => {
        console.log('ROOMS DATA', res.data)
        let data = res.data;

        axiosWithAuth()
        .get('https://mud-game-oreo.herokuapp.com/api/adv/init')
        .then(res => {
          console.log('INIT RESPONSE', res)
          setSelected(res.data.roomId)
        })
        .catch(err => {
            console.log(err)
        })


        let lookup = {};
        for (let i = 0; i < data.length; i++) {
          lookup[data[i].id] = data[i]
        }
        
        function createMap(columnCount, rowCount) {
          const map = [];
          for (let x = 0; x < columnCount; x++) {
            map[x] = []; // set up inner array
            for (let y = 0; y < rowCount; y++) {
               addCell(map, x, y);
            }
          }
          return map;
        }
       
        function addCell(map, x, y) {
           map[x][y] = {room: false, id: -1, roomData: '', left: false, right: false, up: false, down: false}
        }
       
        const map = createMap(20, 20);

        let y = 19;
        let x= 9;
        let position = map[y][x];
        position.room = true

        position.id = data[42].id
        position.roomData = data[42]



        buildBoard(position, y, x);
        
        function goNorth(position, y, x) {
          let current = position;
          let yAxis = y;
          let xAxis = x;

          if (current.roomData.n_to) {
            while (current.roomData.n_to > 0 && yAxis >= 1) {
              current.up = true;
              map[yAxis-1][xAxis].roomData = lookup[current.roomData.n_to];
              map[yAxis-1][xAxis].id = lookup[current.roomData.n_to].id;
              map[yAxis-1][xAxis].room = true;
              current = map[yAxis-1][xAxis];
              yAxis -= 1;
            }
         }
        }

        function buildBoard(position, y, x) {
          let current = position;
          goEast(current, y, x);
          goWest(current, y, x);
          goNorth(current, y, x);

          let yAxis = y;
          // let xAxis = x;
          while (yAxis >= 0) {
            let xStart = 0;
            while(xStart <= 19) {
              let newPosition = map[yAxis][xStart]
              goNorth(newPosition, yAxis, xStart);
              goEast(newPosition, yAxis, xStart);
              goWest(newPosition, yAxis, xStart);
              xStart++;
            }

            let xEnd = 19;
            while(xEnd >= 0) {
              let newPosition = map[yAxis][xEnd]
              goNorth(newPosition, yAxis, xEnd);
              goEast(newPosition, yAxis, xEnd);
              goWest(newPosition, yAxis, xEnd);
              xEnd--;
            }

            yAxis--;
          }
        }

        function goEast(position, y, x) {
          let current = position;
          let yAxis = y;
          let xAxis = x;
          while (current.roomData.e_to > 0 && xAxis <= 18) {
            current.right = true;
            map[yAxis][xAxis+1].roomData = lookup[current.roomData.e_to];
            map[yAxis][xAxis+1].id = lookup[current.roomData.e_to].id;
            map[yAxis][xAxis+1].room = true;
            current = map[yAxis][xAxis+1];
            current.left = true;
            xAxis += 1;
          }
        }

        function goWest(position, y, x) {
          let current = position;
          let yAxis = y;
          let xAxis = x;
          
          while (current.roomData.w_to > 0 && xAxis >= 1) {
            current.left = true
            map[yAxis][xAxis-1].roomData = lookup[current.roomData.w_to];
            map[yAxis][xAxis-1].id = lookup[current.roomData.w_to].id;
            map[yAxis][xAxis-1].room = true;
            current = map[yAxis][xAxis-1];
            current.right = true;
            xAxis -= 1;
            
          }
        }

        setArray(map);

    })
    .catch(err => {
        console.log(err)
    })
  }, [])

  const handleUp = (e) => {
    axiosWithAuth()
    .post('https://mud-game-oreo.herokuapp.com/api/adv/move', {direction: 'n'})
    .then(res => {
      console.log('MOVE RESPONSE', res)

      axiosWithAuth()
      .get('https://mud-game-oreo.herokuapp.com/api/adv/init')
      .then(res => {
        console.log('INIT RESPONSE', res)
        setSelected(res.data.roomId)
  
      })
      .catch(err => {
          console.log(err)
      })

    })

    .catch(err => {
        console.log(err)
    })
  }

  const handleLeft = (e) => {
    axiosWithAuth()
    .post('https://mud-game-oreo.herokuapp.com/api/adv/move', {direction: 'w'})
    .then(res => {
      console.log('MOVE RESPONSE', res)

      axiosWithAuth()
      .get('https://mud-game-oreo.herokuapp.com/api/adv/init')
      .then(res => {
        console.log('INIT RESPONSE', res)
        setSelected(res.data.roomId)
  
      })
      .catch(err => {
          console.log(err)
      })

    })
    .catch(err => {
        console.log(err)
    })
  }

  const handleRight = (e) => {
    axiosWithAuth()
    .post('https://mud-game-oreo.herokuapp.com/api/adv/move', {direction: 'e'})
    .then(res => {
      console.log('MOVE RESPONSE', res)

      axiosWithAuth()
      .get('https://mud-game-oreo.herokuapp.com/api/adv/init')
      .then(res => {
        console.log('INIT RESPONSE', res)
        setSelected(res.data.roomId)
  
      })
      .catch(err => {
          console.log(err)
      })

    })
    .catch(err => {
        console.log(err)
    })
  }

  const handleDown = (e) => {
    axiosWithAuth()
    .post('https://mud-game-oreo.herokuapp.com/api/adv/move', {direction: 's'})
    .then(res => {
      console.log('MOVE RESPONSE', res)

      axiosWithAuth()
      .get('https://mud-game-oreo.herokuapp.com/api/adv/init')
      .then(res => {
        console.log('INIT RESPONSE', res)
        setSelected(res.data.roomId)
  
      })
      .catch(err => {
          console.log(err)
      })

    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', fontSize: '28px', fontWeight: '600', paddingTop: '20px'}}>Game Board</div>
      <div style={{display: 'flex', width: '100%'}}>
        <div style={{margin: '20px', width: '80%'}}>
          {array.map(row => {
            return <Row row={row} selected={selected} />
          })}
        </div>
        <div style={{width: '20%', marginTop: '20px'}}>
          <div>Room</div>
          <div style={{width: '120px', height: '120px', borderRadius: '70px', backgroundColor: 'gray'}}>
            {/* <div style={{borderRadius: '70px'}}> */}
              <div style={{display: 'flex'}}>
                <div style={{width: '40px', height: '40px', backgroundColor: 'transparent', borderRadius: '50px'}}></div>
                <div onClick={handleUp} style={{width: '0px', height: '0px', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '40px solid red', cursor: 'pointer'}}></div>
                <div style={{width: '40px', height: '40px', backgroundColor: 'transparent'}}></div>
              </div>
              <div style={{display: 'flex'}}>
                <div onClick={handleLeft} style={{width: '0px', height: '0px', borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderRight: '40px solid red', cursor: 'pointer'}}></div>
                <div style={{width: '40px', height: '40px', backgroundColor: 'transparent'}}></div>
                <div onClick={handleRight} style={{width: '0px', height: '0px', borderTop: '20px solid transparent', borderBottom: '20px solid transparent', borderLeft: '40px solid red', cursor: 'pointer'}}></div>
              </div>
              <div style={{display: 'flex'}}>
                <div style={{width: '40px', height: '40px', backgroundColor: 'transparent'}}></div>
                <div onClick={handleDown} style={{width: '0px', height: '0px', borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '40px solid red', cursor: 'pointer'}}></div>
                <div style={{width: '40px', height: '40px', backgroundColor: 'transparent'}}></div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

function Row({row, selected} ) {
console.log('ROW', row)
  return (
    <div style={{display: 'grid', textAlign: 'left', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ',
         }}>
      {row.map(card => {
        return <Card card={card} selected={selected}/>
      })}
    </div>
  )
}

function Card({card, selected}) {
console.log('CARD', card, 'selected', selected)
  return (
    <div style={{height: '20px', width: '100%',
        backgroundColor: `${card.room ? card.id === selected ? "orange" : "green" : "lightgray"}`,
        borderTop: `${card.up ? '1px solid transparent' : card.room ? '1px solid red' : '1px solid transparent'}`,
        borderLeft: `${card.left ? '1px solid transparent' : card.room ? '1px solid red' : '1px solid transparent'}`,
        borderRight: `${card.right ? '1px solid transparent' : card.room ? '1px solid red' : '1px solid transparent'}`,
        borderBottom: `${card.down ? '1px solid transparent' : card.room ? '1px solid transparent' : '1px solid transparent'}`
    }}>   
      {/* <div style={{display: 'flex', width: '100%'}}>
        <div style={{width: '30%', height: '30%', backgroundColor: 'transparent'}}></div>
        <div style={{width: '30%', height: '30%', borderTop: '10px solid red', }}></div>
        <div style={{width: '30%', height: '30%', backgroundColor: 'transparent'}}></div>
      </div>
      <div style={{display: 'flex', width: '100%'}}>
        <div style={{width: '30%', height: '30%', borderLeft: '10px solid red'}}></div>
        <div style={{width: '30%', height: '30%', backgroundColor: 'transparent'}}></div>
        <div style={{width: '30%', height: '30%', borderRight: '10px solid red'}}></div>
      </div>
      <div style={{display: 'flex', width: '100%'}}>
        <div style={{width: '30%', height: '30%', backgroundColor: 'transparent'}}></div>
        <div style={{width: '30%', height: '30%', borderBottom: '10px solid red'}}></div>
        <div style={{width: '30%', height: '30%', backgroundColor: 'transparent'}}></div>
      </div>    */}
    </div>
  )
}