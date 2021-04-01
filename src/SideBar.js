import { AppBar, Button, Container, Divider, FormControlLabel, Grid, Switch, TextField, Toolbar, Typography } from '@material-ui/core'

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react'
import RestoreIcon from '@material-ui/icons/Restore';
import VectorItem from './VectorItem'

export default function SideBar({updateVectorMesh, updateMatrixParent, vectors, transformationMatrix, setPlay, reset, play, auto, toggleAuto, cube, toggleCube}) {


    const updateMatrix = (i,val) => {
        var preMatrix = [...transformationMatrix.elements]
        if (val !== ''){
            preMatrix[i] = parseFloat(val);
        } else {
            preMatrix[i] = "";
        }
        updateMatrixParent(preMatrix);


    }

    const addVector = () => {
        var preVector = [...vectors]
        preVector.push([1,1,1])
        updateVectorMesh(preVector);
    }

    const deleteVector = (index) => {
        var preVector = [...vectors];
        preVector.splice(index, 1);
        updateVectorMesh(preVector);
    }

    const updateVector = (n,index,val) => {
        var preVector = [...vectors];
        if (val !== ''){
            preVector[index][n] = parseFloat(val);
        } else {
            preVector[index][n] = "";

        }

        updateVectorMesh(preVector);
    }

    const trimMatrix = (transformationMatrix) => {
        var matrixNew = [...transformationMatrix.slice(0, 3),...transformationMatrix.slice(4, 7),...transformationMatrix.slice(8, 11)];
        return(matrixNew);
    }

    return (
        <>
             <AppBar position="static">
  <Toolbar>
   
    <Typography variant="h6" color="inherit">
      Linear Transformation Visaulizer
    </Typography>
  </Toolbar>
</AppBar>
        <Container style={{width: 355}}>
       
            <div style={{height: "calc(100vh - 110px)",overflow: "scroll"}}>
          <Typography variant="h6" style={{marginTop: 16}} gutterBottom>Transformation Matrix</Typography>

    
          <Grid container spacing={2}>
          {trimMatrix(transformationMatrix.elements).map((cell, i) => {
              return( <Grid item xs={4}>
                <TextField disabled={play==="PLAY"} size="small" type="number" step="any" onChange={(e)=>updateMatrix(Math.floor(i/3)+i,e.target.value)} value={cell} variant="outlined" />
            </Grid>)})}
            
        </Grid>

          <Divider style={{marginTop: 16, marginBottom: 16}}/>

          <Typography variant="h6"  gutterBottom>Vectors</Typography>
          {vectors.map((item, index) => {
              return( <VectorItem disabled={play==="PLAY"} deleteVector={deleteVector} updateVector={updateVector} x={item[0]} y={item[1]} z={item[2]} key={index} index={index}/>)
          })}

               
          
          <Button onClick={addVector} variant="contained" style={{marginTop: 16}} disabled={vectors.length > 8} fullWidth>Add Vector</Button>
          <Divider style={{marginTop: 16, marginBottom: 16}}/>
          <Typography variant="h6"  gutterBottom>Determinant</Typography>

          <FormControlLabel
            style={{marginLeft: 0}}
        
        control={
          <Switch
            disabled={play!=="INIT"}
            checked={cube}
            onChange={toggleCube}
            name="checkedB"
            color="primary"
          />
        }
        label="Show unit cube"
      />
        <Divider style={{marginTop:16, marginBottom:16}}/>

          {play!=="DONE" &&  <Button fullWidth style={{marginTop: 0}} disabled={transformationMatrix.elements.includes("")||play==="PLAY"} onClick={setPlay} startIcon={<PlayArrowIcon />}
          variant="contained" color="primary">
          Play
        </Button>}



        {play==="DONE" && <Button fullWidth style={{marginTop: 0}} onClick={reset} startIcon={<RestoreIcon />}
          variant="contained" color="primary">
          Reset
        </Button>}
        </div>

        <FormControlLabel
        fullWidth
        control={
          <Switch
            checked={auto}
            onChange={toggleAuto}
            name="checkedB"
            color="primary"
          />
        }
        label="Auto Rotate"
      />
        </Container>
        </>
    )
}
