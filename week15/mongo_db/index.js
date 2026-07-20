import { createUser, getAllUsers, getById, updateUser, deleteUser } from "./DAL/users.dal.js";

async function runDemo() {
  console.log("--- Starting MongoDB CRUD Demo ---");

  // 1. קבלת כל המשתמשים
  console.log("\n1. Fetching all users:");
  const users = await getAllUsers();
  console.log(users);

  // 2. יצירת משתמש חדש
  console.log("\n2. Creating new user:");
  const newUser = await createUser({ username: "MosheTemp", id: 45 });
  console.log("Created User:", newUser);

  if (newUser && newUser._id) {
    const userId = newUser._id.toString();

    // 3. עדכון המשתמש החדש
    console.log("\n3. Updating user username:");
    const updateResult = await updateUser(userId, { username: "MosheUpdated" });
    console.log("Update Result:", updateResult);

    // 4. שליפת המשתמש המעודכן לפי מזהה
    console.log("\n4. Fetching updated user by ID:");
    const updatedUser = await getById(userId);
    console.log("Updated User:", updatedUser);

    // 5. מחיקת המשתמש
    console.log("\n5. Deleting user:");
    const deleteResult = await deleteUser(userId);
    console.log("Delete Result:", deleteResult);

    // 6. וידוא מחיקה
    console.log("\n6. Fetching all users after deletion:");
    const finalUsers = await getAllUsers();
    console.log(finalUsers);
  }

  console.log("\n--- Demo Finished ---");
  process.exit(0);
}

// הרצת הדמו
runDemo();