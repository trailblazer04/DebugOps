import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'devops' },
      update: {},
      create: {
        name: 'DevOps',
        slug: 'devops',
        description: 'Docker, Kubernetes, CI/CD, AWS, Terraform',
        icon: 'Wrench',
        color: 'bg-blue-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'programming' },
      update: {},
      create: {
        name: 'Programming',
        slug: 'programming',
        description: 'Python, C, C++, and other programming languages',
        icon: 'Code',
        color: 'bg-green-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'cybersecurity' },
      update: {},
      create: {
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Ethical hacking, pentesting, security tools',
        icon: 'Shield',
        color: 'bg-red-500',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'linux' },
      update: {},
      create: {
        name: 'Linux',
        slug: 'linux',
        description: 'Linux system administration and troubleshooting',
        icon: 'Terminal',
        color: 'bg-purple-500',
      },
    }),
  ])

  // Create sample error
  await prisma.error.upsert({
    where: { slug: 'docker-daemon-connection-error' },
    update: {},
    create: {
      title: "Docker: 'Cannot connect to Docker daemon' Error",
      slug: 'docker-daemon-connection-error',
      excerpt: 'Error response from daemon: Cannot connect to the Docker daemon at unix:///var/run/docker.sock',
      content: `# Problem

You're getting this error when trying to run Docker commands:

\`\`\`bash
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. 
Is the docker daemon running?
\`\`\`

## Root Cause

This error occurs when:
1. Docker daemon is not running
2. Your user doesn't have permission to access Docker
3. Docker socket is not accessible

## Solution

### Step 1: Check if Docker is running

\`\`\`bash
sudo systemctl status docker
\`\`\`

If not running, start it:

\`\`\`bash
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

### Step 2: Add user to docker group

\`\`\`bash
sudo usermod -aG docker $USER
\`\`\`

**Important**: Log out and log back in for this to take effect.

### Step 3: Verify permissions

\`\`\`bash
ls -l /var/run/docker.sock
\`\`\`

Should show:
\`\`\`
srw-rw---- 1 root docker 0 Nov 8 10:00 /var/run/docker.sock
\`\`\`

## Prevention

Add this to your \`.bashrc\` or \`.zshrc\`:

\`\`\`bash
# Start Docker on login if not running
if ! docker ps >/dev/null 2>&1; then
    echo "Starting Docker..."
    sudo systemctl start docker
fi
\`\`\`

## Related Errors

- Docker permission denied
- Docker socket not found`,
      categoryId: categories[0].id,
      subcategory: 'Docker',
      status: 'PUBLISHED',
      tags: {
        create: [
          { name: 'docker', slug: 'docker' },
          { name: 'daemon', slug: 'daemon' },
          { name: 'linux', slug: 'linux' },
        ],
      },
    },
  })

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.disconnect()
  })