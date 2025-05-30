import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

async function main() {
  const hashedMainPassword = await bcrypt.hash('qwerasdf', 12);
  const hashedPassword1 = await bcrypt.hash('user1Password123', 12);
  const hashedPassword2 = await bcrypt.hash('user2Password456', 12);

  const mainUser = await prisma.user.create({
    data: {
      email: 'testuser@teste.com',
      password: hashedMainPassword,
      amount: 10000,
      sessions: {
        create: [{ token: 'session_token_1' }, { token: 'session_token_2' }],
      },
      transactions: {
        create: [
          { entity: 'Store A', description: 'Groceries', amount: -50 },
          { entity: 'Company B', description: 'Salary', amount: 2000 },
          { entity: 'Cafe C', description: 'Coffee', amount: -5 },
          { entity: 'Gas Station', description: 'Fuel', amount: -40 },
          { entity: 'Freelance Project', description: 'Website Design', amount: 500 },
          { entity: 'Store D', description: 'Clothes', amount: -100 },
          { entity: 'Company E', description: 'Bonus', amount: 1000 },
          { entity: 'Store F', description: 'Electronics', amount: -200 },
          { entity: 'Company G', description: 'Salary', amount: 2500 },
          { entity: 'Store H', description: 'Books', amount: -30 },
          { entity: 'Company I', description: 'Salary', amount: 3000 },
          { entity: 'Store J', description: 'Shoes', amount: -80 },
          { entity: 'Company K', description: 'Salary', amount: 3500 },
          { entity: 'Store L', description: 'Toys', amount: -70 },
          { entity: 'Company M', description: 'Salary', amount: 4000 },
          { entity: 'Store N', description: 'Tools', amount: -60 },
          { entity: 'Company O', description: 'Salary', amount: 4500 },
          { entity: 'Store P', description: 'Furniture', amount: -150 },
          { entity: 'Company Q', description: 'Salary', amount: 5000 },
          { entity: 'Store R', description: 'Appliances', amount: -250 },
          { entity: 'Company S', description: 'Salary', amount: 5500 },
          { entity: 'Store T', description: 'Jewelry', amount: -90 },
          { entity: 'Company U', description: 'Salary', amount: 6000 },
          { entity: 'Store V', description: 'Sporting Goods', amount: -120 },
          { entity: 'Company W', description: 'Salary', amount: 6500 },
        ],
      },
      Debts: {
        create: [
          { description: 'Car Loan', creditor: 'Bank X', amount: 5000, paid: false },
          { description: 'Credit Card', creditor: 'Bank Y', amount: 200, paid: true, payDate: new Date('2023-08-10') },
          { description: 'Personal Loan', creditor: 'Friend B', amount: 300, paid: false },
          { description: 'Student Loan', creditor: 'Bank X', amount: 10000, paid: false },
          { description: 'Student Loan', creditor: 'University Z', amount: 15000, paid: false },
          { description: 'Personal Loan', creditor: 'Friend B', amount: 300, paid: false },
          { description: 'Medical Bill', creditor: 'Hospital Y', amount: 1000, paid: false },
          { description: 'Taxes', creditor: 'Government', amount: 500, paid: false },
          { description: 'Utility Bill', creditor: 'Company Z', amount: 100, paid: false },
          { description: 'Rent', creditor: 'Landlord', amount: 800, paid: true, payDate: new Date('2023-09-01') },
          { description: 'Insurance', creditor: 'Company Z', amount: 200, paid: false },
          { description: 'Internet Bill', creditor: 'Company Z', amount: 50, paid: false },
          {
            description: 'Phone Bill',
            creditor: 'Company Z',
            amount: 30,
            paid: false,
            payDate: new Date('2023-09-01'),
          },
          { description: 'Subscription', creditor: 'Company Z', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1000, paid: true },
          { description: 'Loan', creditor: 'Bank X', amount: 500, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 200, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 100, paid: false, payDate: new Date('2023-09-11') },
          { description: 'Loan', creditor: 'Bank X', amount: 50, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 20, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 5, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 2, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1, paid: false },
        ],
      },
      Credits: {
        create: [
          {
            description: 'Loan Repayment',
            debtor: 'Friend A',
            amount: 150,
            paid: true,
            payDate: new Date('2023-07-20'),
          },
          { description: 'Freelance Job', debtor: 'Client B', amount: 500, paid: false },
          { description: 'Tutoring', debtor: 'Student C', amount: 100, paid: false },
          { description: 'Refund', debtor: 'Store D', amount: 30, paid: true, payDate: new Date('2023-09-15') },
          { description: 'Freelance Job', debtor: 'Client', amount: 200, paid: true, payDate: new Date('2023-08-01') },
          { description: 'Freelance Job', debtor: 'Client', amount: 300, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 400, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 500, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 600, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 700, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 800, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 900, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1000, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1100, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 1200,
            paid: false,
            payDate: new Date('2023-07-28'),
          },
          { description: 'Freelance Job', debtor: 'Client', amount: 1300, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1400, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1500, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 1600,
            paid: false,
            payDate: new Date('2023-01-20'),
          },
          { description: 'Freelance Job', debtor: 'Client', amount: 1700, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1800, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1900, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2000, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2100, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2200, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 2300,
            paid: false,
            payDate: new Date('2023-07-20'),
          },
        ],
      },
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword1,
      amount: 1000,
      sessions: {
        create: [{ token: 'session_token_1' }, { token: 'session_token_2' }],
      },
      transactions: {
        create: [
          { entity: 'Store A', description: 'Groceries', amount: -50 },
          { entity: 'Company B', description: 'Salary', amount: 2000 },
          { entity: 'Cafe C', description: 'Coffee', amount: -5 },
          { entity: 'Gas Station', description: 'Fuel', amount: -40 },
          { entity: 'Freelance Project', description: 'Website Design', amount: 500 },
          { entity: 'Store D', description: 'Clothes', amount: -100 },
          { entity: 'Company E', description: 'Bonus', amount: 1000 },
          { entity: 'Store F', description: 'Electronics', amount: -200 },
          { entity: 'Company G', description: 'Salary', amount: 2500 },
          { entity: 'Store H', description: 'Books', amount: -30 },
          { entity: 'Company I', description: 'Salary', amount: 3000 },
          { entity: 'Store J', description: 'Shoes', amount: -80 },
          { entity: 'Company K', description: 'Salary', amount: 3500 },
          { entity: 'Store L', description: 'Toys', amount: -70 },
          { entity: 'Company M', description: 'Salary', amount: 4000 },
          { entity: 'Store N', description: 'Tools', amount: -60 },
          { entity: 'Company O', description: 'Salary', amount: 4500 },
          { entity: 'Store P', description: 'Furniture', amount: -150 },
          { entity: 'Company Q', description: 'Salary', amount: 5000 },
          { entity: 'Store R', description: 'Appliances', amount: -250 },
          { entity: 'Company S', description: 'Salary', amount: 5500 },
          { entity: 'Store T', description: 'Jewelry', amount: -90 },
          { entity: 'Company U', description: 'Salary', amount: 6000 },
          { entity: 'Store V', description: 'Sporting Goods', amount: -120 },
          { entity: 'Company W', description: 'Salary', amount: 6500 },
        ],
      },
      Debts: {
        create: [
          { description: 'Car Loan', creditor: 'Bank X', amount: 5000, paid: false },
          { description: 'Credit Card', creditor: 'Bank Y', amount: 200, paid: true, payDate: new Date('2023-08-10') },
          { description: 'Personal Loan', creditor: 'Friend B', amount: 300, paid: false },
          { description: 'Student Loan', creditor: 'Bank X', amount: 10000, paid: false },
          { description: 'Student Loan', creditor: 'University Z', amount: 15000, paid: false },
          { description: 'Personal Loan', creditor: 'Friend B', amount: 300, paid: false },
          { description: 'Medical Bill', creditor: 'Hospital Y', amount: 1000, paid: false },
          { description: 'Taxes', creditor: 'Government', amount: 500, paid: false },
          { description: 'Utility Bill', creditor: 'Company Z', amount: 100, paid: false },
          { description: 'Rent', creditor: 'Landlord', amount: 800, paid: true, payDate: new Date('2023-09-01') },
          { description: 'Insurance', creditor: 'Company Z', amount: 200, paid: false },
          { description: 'Internet Bill', creditor: 'Company Z', amount: 50, paid: false },
          {
            description: 'Phone Bill',
            creditor: 'Company Z',
            amount: 30,
            paid: false,
            payDate: new Date('2023-09-01'),
          },
          { description: 'Subscription', creditor: 'Company Z', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1000, paid: true },
          { description: 'Loan', creditor: 'Bank X', amount: 500, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 200, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 100, paid: false, payDate: new Date('2023-09-11') },
          { description: 'Loan', creditor: 'Bank X', amount: 50, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 20, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 5, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 2, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1, paid: false },
        ],
      },
      Credits: {
        create: [
          {
            description: 'Loan Repayment',
            debtor: 'Friend A',
            amount: 150,
            paid: true,
            payDate: new Date('2023-07-20'),
          },
          { description: 'Freelance Job', debtor: 'Client B', amount: 500, paid: false },
          { description: 'Tutoring', debtor: 'Student C', amount: 100, paid: false },
          { description: 'Refund', debtor: 'Store D', amount: 30, paid: true, payDate: new Date('2023-09-15') },
          { description: 'Freelance Job', debtor: 'Client', amount: 200, paid: true, payDate: new Date('2023-08-01') },
          { description: 'Freelance Job', debtor: 'Client', amount: 300, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 400, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 500, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 600, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 700, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 800, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 900, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1000, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1100, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 1200,
            paid: false,
            payDate: new Date('2023-07-28'),
          },
          { description: 'Freelance Job', debtor: 'Client', amount: 1300, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1400, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1500, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 1600,
            paid: false,
            payDate: new Date('2023-01-20'),
          },
          { description: 'Freelance Job', debtor: 'Client', amount: 1700, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1800, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 1900, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2000, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2100, paid: false },
          { description: 'Freelance Job', debtor: 'Client', amount: 2200, paid: false },
          {
            description: 'Freelance Job',
            debtor: 'Client',
            amount: 2300,
            paid: false,
            payDate: new Date('2023-07-20'),
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: hashedPassword2,
      amount: 500,
      sessions: {
        create: [{ token: 'session_token_3' }],
      },
      transactions: {
        create: [
          { entity: 'Gym', description: 'Monthly Subscription', amount: -30 },
          { entity: 'Company C', description: 'Part-time Job', amount: 800 },
          { entity: 'Supermarket', description: 'Groceries', amount: -120 },
          { entity: 'Pharmacy', description: 'Medicine', amount: -15 },
          { entity: 'Online Store', description: 'Book Purchase', amount: -25 },
          { entity: 'Company D', description: 'Freelance Project', amount: 300 },
          { entity: 'Restaurant', description: 'Dinner', amount: -40 },
          { entity: 'Company E', description: 'Salary', amount: 1000 },
          { entity: 'Gas Station', description: 'Fuel', amount: -50 },
          { entity: 'Store F', description: 'Clothes', amount: -80 },
          { entity: 'Company G', description: 'Salary', amount: 1200 },
          { entity: 'Store H', description: 'Shoes', amount: -60 },
          { entity: 'Company I', description: 'Salary', amount: 1400 },
          { entity: 'Store J', description: 'Toys', amount: -70 },
          { entity: 'Company K', description: 'Salary', amount: 1600 },
          { entity: 'Store L', description: 'Tools', amount: -40 },
          { entity: 'Company M', description: 'Salary', amount: 1800 },
          { entity: 'Store N', description: 'Furniture', amount: -100 },
          { entity: 'Company O', description: 'Salary', amount: 2000 },
          { entity: 'Store P', description: 'Appliances', amount: -150 },
          { entity: 'Company Q', description: 'Salary', amount: 2200 },
          { entity: 'Store R', description: 'Jewelry', amount: -70 },
          { entity: 'Company S', description: 'Salary', amount: 2400 },
          { entity: 'Store T', description: 'Sporting Goods', amount: -90 },
          { entity: 'Company U', description: 'Salary', amount: 2600 },
          { entity: 'Store V', description: 'Electronics', amount: -200 },
          { entity: 'Company W', description: 'Salary', amount: 2800 },
        ],
      },
      Debts: {
        create: [
          { description: 'Mortgage', creditor: 'Bank Z', amount: 10000, paid: false },
          { description: 'Medical Bill', creditor: 'Clinic A', amount: 250, paid: false },
          { description: 'Credit Card', creditor: 'Bank Y', amount: 500, paid: true, payDate: new Date('2023-10-05') },
          { description: 'Car Loan', creditor: 'Bank X', amount: 8000, paid: false },
          { description: 'Student Loan', creditor: 'Bank X', amount: 15000, paid: false },
          { description: 'Personal Loan', creditor: 'Friend C', amount: 300, paid: false },
          { description: 'Medical Bill', creditor: 'Hospital B', amount: 500, paid: false },
          { description: 'Taxes', creditor: 'Government', amount: 500, paid: false },
          { description: 'Utility Bill', creditor: 'Company Z', amount: 100, paid: false },
          { description: 'Rent', creditor: 'Landlord', amount: 700, paid: true, payDate: new Date('2023-09-01') },
          { description: 'Insurance', creditor: 'Company Z', amount: 200, paid: false },
          { description: 'Internet Bill', creditor: 'Company Z', amount: 50, paid: false },
          { description: 'Phone Bill', creditor: 'Company Z', amount: 30, paid: false },
          { description: 'Subscription', creditor: 'Company Z', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1000, paid: true },
          { description: 'Loan', creditor: 'Bank X', amount: 500, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 200, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 100, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 50, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 20, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 10, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 5, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 2, paid: false },
          { description: 'Loan', creditor: 'Bank X', amount: 1, paid: true },
        ],
      },
      Credits: {
        create: [
          { description: 'Rent Payment', debtor: 'Tenant A', amount: 700, paid: true, payDate: new Date('2023-09-01') },
          { description: 'Freelance Writing', debtor: 'Client C', amount: 200, paid: false },
          {
            description: 'Reimbursement',
            debtor: 'Company D',
            amount: 75,
            paid: true,
            payDate: new Date('2023-08-20'),
          },
          { description: 'Loan Payment', debtor: 'Friend C', amount: 100, paid: false },
          {
            description: 'Freelance Writing',
            debtor: 'Client D',
            amount: 300,
            paid: true,
            payDate: new Date('2023-08-15'),
          },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 400, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 500, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 600, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 700, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 800, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 900, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1000, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1100, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1200, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1300, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1400, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1500, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1600, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1700, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1800, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 1900, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 2000, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 2100, paid: false },
          { description: 'Freelance Writing', debtor: 'Client D', amount: 2200, paid: false },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
