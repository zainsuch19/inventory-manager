/*'use client'
import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Typography} from "@mui/material";


export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [Open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });

    });
    setInventory(inventoryList);
    
  };

  useEffect(() => {
    updateInventory();

  }, []);

  return(

   <Box>
    <Typography variant = "h1">Inventory Management</Typography>
    {
      inventory.forEach((item)=>{
        return (
          <>
          {item.name};
          {item.count};
          </>
        )

      })
    }
    </Box>
  )
}*/

/*'use client';
import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import {Box, Modal, Button, Typography, Stack, TextField} from "@mui/material";
import { collection, deleteDoc, getDocs, query, setDoc, getDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    }
    else{
      await setDoc(docRef, {quantity: 1});
    }

    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()){
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else{
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }

    await updateInventory();
  }

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
    sx={{
      backgroundImage: `url('https://media.istockphoto.com/id/876700382/vector/kitchenware-background.jpg?s=612x612&w=0&k=20&c=neJUuoTB9TbibAvWi5s_ilOA42h_6De9zP8LMsdnwtI=')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: "'Roboto', sans-serif" // Change to a different font if desired
    }}
  >
    <Modal
    open={open}
    onClose={handleClose}>
      <Box
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        width={400}
        bgcolor={"#fefefe"}
        border={"2px solid #1a1a1a"}
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection={"column"}
        gap={3}
        sx={{
          transform: "translate(-50%, -50%)",
          borderRadius: '8px',
          fontFamily: "'Open Sans', sans-serif" // Change the modal font style
        }}
      >
        <Typography variant="h6" color="#333">Add Item</Typography>
        <Stack width={"100%"} direction={"row"} spacing={2}>
          <TextField 
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#4caf50', color: '#fff' }} // Green button with white text
            onClick={() => {
              addItem(itemName);
              setItemName('');
              handleClose();
            }}
          >
            Add
          </Button>
        </Stack>  
      </Box>
    </Modal>
    <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#007bff', color: '#fff' }}>
      Add New Item
    </Button>
    <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2, width: '800px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
      />
    <Box border='3px solid #333' borderRadius='8px' overflow='hidden'>
      <Box width="800px" height="100px" bgcolor="#ffcc00" alignItems="center" justifyContent="center" display="flex">
        <Typography variant="h4" color="#333">Inventory</Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto" sx={{ backgroundColor: '#e0e0e0' }}>
          {
            filteredInventory.length > 0 ? (
              filteredInventory.map(({ name, quantity }) => (
                <Box
                  key={name}
                  width="100%"
                  minHeight="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  bgcolor={"#f9f9f9"}
                  padding={5}
                  sx={{
                    borderBottom: '2px solid #ddd',
                    '&:last-child': { borderBottom: 'none' },
                    borderRadius: '4px'
                  }}
                >
                  <Typography variant="h6" color="#333" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="h6" color="#333" textAlign="center">
                    {quantity}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: '#fff' }} onClick={() => addItem(name)}>Add</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#f44336', color: '#fff' }} onClick={() => removeItem(name)}>Remove</Button>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography variant="h6" color="#333" textAlign="center" padding={5}>
                No items found.
              </Typography>
            )
          }
        </Stack>
      </Box>
    </Box>
  );
}*/

'use client';
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Button, Typography, Stack, TextField, Paper } from "@mui/material";
import { collection, deleteDoc, getDocs, query, setDoc, getDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  }

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('https://c8.alamy.com/comp/2F4EG7A/cooking-with-love-white-line-vector-illustration-one-black-background-kitchen-chalk-sweet-seamless-pattern-bakery-print-design-2F4EG7A.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Lato', sans-serif"
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '900px',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <Stack spacing={3}>
          <Button 
            variant="contained" 
            onClick={handleOpen} 
            sx={{ backgroundColor: '#FF5722', color: '#fff', alignSelf: 'flex-start' }}
          >
            Add New Item
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px' }}
          />
          <Box>
            <Typography variant="h5" color="#333" mb={2} textAlign="center">
              Inventory List
            </Typography>
            <Box
              sx={{
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#FAFAFA',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {
                filteredInventory.length > 0 ? (
                  filteredInventory.map(({ name, quantity }) => (
                    <Stack
                      key={name}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      sx={{
                        borderBottom: '1px solid #ddd',
                        '&:last-child': { borderBottom: 'none' }
                      }}
                    >
                      <Typography variant="h6" color="#333">
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography variant="h6" color="#333">
                        {quantity}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Button variant="outlined" sx={{ color: '#4CAF50', borderColor: '#4CAF50' }} onClick={() => addItem(name)}>Add</Button>
                        <Button variant="outlined" sx={{ color: '#F44336', borderColor: '#F44336' }} onClick={() => removeItem(name)}>Remove</Button>
                      </Stack>
                    </Stack>
                  ))
                ) : (
                  <Typography variant="h6" color="#777" textAlign="center">
                    No items found.
                  </Typography>
                )
              }
            </Box>
          </Box>
        </Stack>
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#fff",
            border: "2px solid #333",
            boxShadow: 24,
            padding: 4,
            borderRadius: '8px'
          }}
        >
          <Typography variant="h6" mb={2}>Add Item</Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}




